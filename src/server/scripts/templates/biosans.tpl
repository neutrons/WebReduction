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
{%for entry_low, entry_high in regions.0.entries|zip:regions.1.entries %}
def reduce{{forloop.counter}}:
	{% with regions.0 as region %} 
	'''
	Region: {{region.id}}
	Comments: {{region.comments}}
	Entry name: {{entry_low.name}}
	'''
	###### Main detector reduction~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	BIOSANS()
	# No neeed for this because we give the full path of the files
	# DataPath(os.path.joint(this_file_directory, "{{title|slugify}}"))
	DirectBeamCenter("{% filename_options region.beam_center_run region.configuration.beam_center_file "Beam Center" %}")
	SetAbsoluteScale({{region.configuration.absolute_scale_factor}})
	{% if region.configuration.solid_angle_correction %}
	SolidAngle({{region.configuration.solid_angle_correction}})
	{% else %}
	NoSolidAngle()
	{% endif %}
	DarkCurrent("{% filepath region.configuration.dark_current_file %}")
	# Normalization
	{{region.configuration.normalization}}
	IQxQy(nbins={{region.configuration.iqxqy_nbins}})
	Mask(nx_low={{region.configuration.mask_left}}, nx_high={{region.configuration.mask_right}},
		ny_low={{region.configuration.mask_bottom}}, ny_high={{region.configuration.mask_top}}, component_name="{{region.configuration.mask_component_name}}")
	MaskComponent("{{region.configuration.mask_total_component_name}}")
	SensitivityCorrection("{% filepath region.configuration.flood_file %}", min_sensitivity={{region.configuration.sensitivity_min}},
		max_sensitivity={{region.configuration.sensitivity_max}}, use_sample_dc={{region.configuration.sensitivity_use_sample_dc}})
	DivideByThickness({{entry_low.thickness}})
	DirectBeamTransmission("{% filepath entry_low.sample_transmission %}",
		"{% filename_options region.empty_beam_run region.configuration.empty_beam_file "Empty beam" %}",
		beam_radius={{region.configuration.transmission_beam_radius}},
		theta_dependent = {{region.configuration.transmission_theta_dependent}},use_sample_dc={{region.configuration.transmission_use_sample_dc}})
	TransmissionDarkCurrent("{% filepath region.configuration.dark_current_file%}")
	AppendDataFile("{% filepath entry_low.sample_scattering %}", workspace=main_{{entry_low.name|slugify}})
	AzimuthalAverage(binning="{{region.configuration.azimuthal_average_binning}}", n_subpix=1, log_binning=True, error_weighting=False)
	#BACKGROUND SETUP FOR MAIN
	Background("{% filepath entry_low.backgroung_scattering %}")
	BckDirectBeamTransmission("{% filepath entry_low.backgroung_transmission %}", 
		"{% filename_options region.empty_beam_run region.configuration.empty_beam_file "Empty beam" %}",
		beam_radius={{region.configuration.transmission_beam_radius}},
		theta_dependent = {{region.configuration.transmission_theta_dependent}})
	BckTransmissionDarkCurrent("{% filepath region.configuration.dark_current_file %}")
	#OUTPUT SETUP    
	OutputPath(os.path.joint(this_file_directory, "{{region.id}}")
	{% if region.configuration.save_iq %}
	SaveIq()
	{% else %}
	NoSaveIq()
	{% endif %}
	Reduce()

	#Passing gravity corrected beam center for wing reduction
	beam_center_x, new_beam_center_y = beam_center_gravitational_drop("{% filename_options region.beam_center_run region.configuration.beam_center_file "Beam Center" %}")
	new_beam_center_y = new_beam_center_y + vert_pix_Offset
	#print "BC_x.......   ",beam_center_x
	#print "New BC_y....   ",new_beam_center_y
	{% endwith %}

	{% with regions.1 as region %} 
	'''
	Region: {{region.id}}
	Comments: {{region.comments}}
	Entry name: {{entry_high.name}}
	'''
	###### Wing detector reduction ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	BIOSANS()
	DataPath(os.path.joint(this_file_directory, "{{title|slugify}}"))
	SetAbsoluteScale({{region.configuration.absolute_scale_factor}})
	SetBeamCenter(beam_center_x,new_beam_center_y)
	{% if region.configuration.solid_angle_correction %}
	SolidAngle({{region.configuration.solid_angle_correction}})
	{% else %}
	NoSolidAngle()
	{% endif %}
	
	DarkCurrent("{% filepath region.configuration.dark_current_file %})")
	# Normalization
	{{region.configuration.normalization}}
	DivideByThickness({{entry_high.thickness}})
	IQxQy(nbins={{region.configuration.iqxqy_nbins}})
	MaskComponent("{{region.configuration.mask_total_component_name}}")#masking main detector
	SensitivityCorrection("{% filepath region.configuration.flood_file %}", min_sensitivity={{region.configuration.sensitivity_min}},
		max_sensitivity={{region.configuration.sensitivity_max}}, use_sample_dc={{region.configuration.sensitivity_use_sample_dc}})
	Mask(nx_low={{region.configuration.mask_left}}, nx_high={{region.configuration.mask_right}},
		ny_low={{region.configuration.mask_bottom}}, ny_high={{region.configuration.mask_top}}, component_name="{{region.configuration.mask_component_name}}")
	MaskComponent("{{region.configuration.mask_total_component_name}}")
	AzimuthalAverage(binning="{{region.configuration.azimuthal_average_binning}}", n_subpix=1, log_binning=True, error_weighting=False)
	ws_trans = mtd['__transmission_raw_'+'{% filename entry_high.sample_transmission %}']
	sample_trans_value = ws_trans.readY(0)[0]
	sample_trans_error = ws_trans.readE(0)[0]
	print "sample transmission......",sample_trans_value
	SetTransmission(sample_trans_value, sample_trans_error, theta_dependent = True)
	#ThetaDependentTransmission(theta_dependence=True)
	AppendDataFile("{% filepath entry_low.sample_scattering %}", workspace=wing_{{entry_high.name|slugify}})
	#BACKGROUND SETUP FOR WING
	Background(bg_scatt_file_name)
	ws_bg_trans = mtd['__transmission_raw_'+'{% filename entry_high.backgroung_transmission %}']
	bg_trans_value = ws_bg_trans.readY(0)[0]
	bg_trans_error = ws_bg_trans.readE(0)[0]
	print "background transmission..",bg_trans_value
	SetBckTransmission(bg_trans_value, bg_trans_error, theta_dependent = True)
	#BckThetaDependentTransmission(theta_dependence=True)
	#OUTPUT SETUP
	OutputPath(os.path.joint(this_file_directory, "{{region.id}}")
	{% if region.configuration.save_iq %}
	SaveIq()
	{% else %}
	NoSaveIq()
	{% endif %}
	Reduce()
	{% endwith %}
	
	#print "\n";
	print "Finished Reducing........ "+"{% filename entry_high.sample_scattering %}"
	print "*****************************************************\n\n"

	#MERGING FROM TWO DETECTORS

	NameMain = "main_{{entry_low.name|slugify}}_Iq"
	NameWing = "wing_{{entry_high.name|slugify}}_Iq"
	q_min_overlap = {{regions.1.configuration.stiching_q_min}}
	q_max_overlap = {{regions.0.configuration.stiching_q_max}}
	
	WkSpMerge = "full_{{entry_low.name|slugify}}_{{entry_high.name|slugify}}_f"
	FileNameOut2=os.path.join(this_file_directory, WkSpMerge+".txt")
	
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
    
	
	
