#
# base script to reduce data for SANS 
# 
import os
import mantid
from mantid.simpleapi import *
from reduction_workflow.instruments.sans.hfir_command_interface import *

from multiprocessing import Process

'''
Script generation for reduction
Title: {{ title}}
User: {{ user }}
Intrument: {{instrument_name}}
IPTS Number: {{ipts_number}}
'''

this_file_directory = os.path.abspath(os.path.dirname(__file__))

{% if regions.0.entries|length != regions.1.entries|length%}
	{%  raise_exception "The entries in the spreadsheet do not have the same number of rows for both of regions." %}
{% endif %}

{% for entry in regions.0.entries %}
def reduce{{forloop.counter}}:
	{% with regions.0 as region %} 
	'''
	Region: {{region.id}}
	Comments: {{region.comments}}
	'''
	###### Main detector reduction~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	BIOSANS()
	DataPath(os.path.joint(this_file_directory, "{{region.id}}"))
	# Beam center: Red={{region.beam_center_run}} Conf={{region.configuration.beam_center_file}}
	{% if region.beam_center_run %}DirectBeamCenter("{% filename region.beam_center_run %}")
	{% elif region.configuration.beam_center_file %}DirectBeamCenter("{% filename  region.configuration.beam_center_file %}")
	{% else %}
	{%  raise_exception "Beam center is not defined in neither Reduction nor Configuration : "|add:region.configuration.title %}
	{% endif %}
	SetAbsoluteScale({{region.configuration.absolute_scale_factor}})
	SolidAngle({{region.configuration.solid_angle_correction}})
	DarkCurrent({{region.configuration.dark_current_file}})
	# Normalization
	{{region.configuration.normalization}}
	IQxQy(nbins={{region.configuration.iqxqy_nbins}})
	Mask(nx_low={{region.configuration.mask_left}}, nx_high={{region.configuration.mask_right}},
		ny_low={{region.configuration.mask_bottom}}, ny_high={{region.configuration.mask_top}}, component_name="{{region.configuration.mask_component_name}}")
	MaskComponent("{{region.configuration.mask_total_component_name}}")
	SensitivityCorrection("{{region.configuration.flood_file}}", min_sensitivity={{region.configuration.sensitivity_min}},
		max_sensitivity={{region.configuration.sensitivity_max}}, use_sample_dc={{region.configuration.sensitivity_use_sample_dc}})
	DivideByThickness({{entry.thickness}})
	
	#
	#
	#
	DirectBeamTransmission("{% filename entry.sample_transmission %}",
		{% if region.empty_beam_run %}"{% filename region.empty_beam_run %}",
		{% elif region.configuration.empty_beam_file %}"{% filename  region.configuration.empty_beam_file %}",
		{% else %}{%  raise_exception "Empty beam is not defined in neither Reduction nor Configuration : "|add:region.configuration.title %}{% endif %}
		beam_radius={{region.configuration.transmission_beam_radius}},
		theta_dependent = {{region.configuration.transmission_theta_dependent}},use_sample_dc={{region.configuration.transmission_use_sample_dc}})
	TransmissionDarkCurrent(dark)
	AppendDataFile(scatt_file_name, workspace=main_out_name)
	AzimuthalAverage(binning=main_q_range, n_subpix=1, log_binning=True, error_weighting=False)
	#BACKGROUND SETUP FOR MAIN
	Background(bg_scatt_file_name)
	BckDirectBeamTransmission("{{entry.backgroung_transmission}}", MT_Tr, beam_radius=3,theta_dependent = False)
	BckTransmissionDarkCurrent(dark)
	#OUTPUT SETUP    
	OutputPath(data_out_folder)
	#SaveIq(process='None')
	NoSaveIq()
	Reduce()
	#Passing gravity corrected beam center for wing reduction
	beam_center_x, new_beam_center_y = beam_center_gravitational_drop(BC)
	new_beam_center_y = new_beam_center_y + vert_pix_Offset
	#print "BC_x.......   ",beam_center_x
	#print "New BC_y....   ",new_beam_center_y
	{% endwith %}

	{% with regions.1 as region %} 
	'''
	Region: {{region.id}}
	Comments: {{region.comments}}
	'''
	###### Wing detector reduction ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	BIOSANS()
	DataPath(xml_data_folder)
	SetAbsoluteScale(wing_scalar)
	SetBeamCenter(beam_center_x,new_beam_center_y)
	#SolidAngle(detector_wing=True)
	NoSolidAngle() #No solid angle correction if sensitivity transmission corrected
	DarkCurrent(dark)
	MonitorNormalization()
	DivideByThickness(Thick)
	IQxQy(nbins=80)
	MaskComponent("detector1")#masking main detector
	SensitivityCorrection(wing_flood, min_sensitivity=0.3, max_sensitivity=1.7, use_sample_dc=False)
	Mask(nx_low=wing_nxlow, nx_high=wing_nxhigh, ny_low=wing_nylow, ny_high=wing_nyhigh, component_name="wing_detector")
	AzimuthalAverage(binning=wing_q_range, n_subpix=1,error_weighting=False)
	ws_trans = mtd['__transmission_raw_'+trans_file_name]
	sample_trans_value = ws_trans.readY(0)[0]
	sample_trans_error = ws_trans.readE(0)[0]
	print "sample transmission......",sample_trans_value
	SetTransmission(sample_trans_value, sample_trans_error, theta_dependent = True)
	#ThetaDependentTransmission(theta_dependence=True)
	AppendDataFile(scatt_file_name, workspace=wing_out_name)
	#BACKGROUND SETUP FOR WING
	Background(bg_scatt_file_name)
	ws_bg_trans = mtd['__transmission_raw_'+bg_trans_file_name]
	bg_trans_value = ws_bg_trans.readY(0)[0]
	bg_trans_error = ws_bg_trans.readE(0)[0]
	print "background transmission..",bg_trans_value
	SetBckTransmission(bg_trans_value, bg_trans_error, theta_dependent = True)
	#BckThetaDependentTransmission(theta_dependence=True)
	#OUTPUT SETUP
	OutputPath(data_out_folder)
	#SaveIq(process='None')
	NoSaveIq()
	Reduce()
	{% endwith %}
	
	#print "\n";
	print "Finished Reducing........ "+scatt_file_name
	print "*****************************************************\n\n"

	#MERGING FROM TWO DETECTORS

	NameMain = main_out_name+"_Iq"
	NameWing = wing_out_name+"_Iq"
	q_min_overlap = min
	q_max_overlap = max

	FileNameOut2=data_out_folder+"/"+WkSpMerge+".txt"
	if os.path.exists(root_path):
		try:
			Stitch(data_list=[NameMain, NameWing], q_min=q_min_overlap, q_max=q_max_overlap, output_workspace=WkSpMerge,  )
		except (RuntimeError):
			print ""
			print "RuntimeError - the data file " + NameMain+ " may not exist, but other issues certainly exist. Check this error message:"
			print "RuntimeError - the data file " + NameWing+ " may not exist, but other issues certainly exist. Check this error message:"
			print sys.exc_info()
		try:
			SaveAscii(InputWorkspace=WkSpMerge, Filename=FileNameOut2, Separator="Tab", CommentIndicator="#", WriteSpectrumID=False, WriteXError=True)
			print ""
			#shutil.move("combined_scaled_Iq.xml",FileNameOut1)
			#shutil.move("combined_scaled_Iq.txt",FileNameOut2)
		except (RuntimeError):
			print ""
			print "RuntimeError - the data file " + FileNameOut1+ " may not exist.  Check this error message:"
			print sys.exc_info() 
	#print "DONE reduction"
	#print "  "

{% endfor %}



if __name__ == '__main__':
{% for entry in regions.0.entries %}
	p{{forloop.counter}} = Process(target=reduce{{forloop.counter}}, args=())
{% endfor%}
{% for entry in regions.0.entries %}
	p{{forloop.counter}}.start()
{% endfor%}
{% for entry in regions.0.entries %}
	p{{forloop.counter}}.join()
{% endfor%}
    
	
	
