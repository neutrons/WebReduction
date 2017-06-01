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

{% for region in regions %}
{% for entry in region.entries %}
def reduce{{forloop.parentloop.counter}}{{forloop.counter}}:
	'''
	Region: {{region.id}}
	Comments: {{region.comments}}
	'''
	GPSANS()
	# SetSampleDetectorDistance(6850)
	# SetWavelength(6.08, 0.15)
	SolidAngle({{region.configuration.solid_angle_correction}})
	DarkCurrent("{% filename  region.configuration.dark_current_file %}")
	# Normalization
	{{region.configuration.normalization}}
	SetAbsoluteScale({{region.configuration.absolute_scale_factor}})

	IQxQy(nbins={{region.configuration.iqxqy_nbins}})
	
	# Beam center: Red={{region.beam_center_run}} Conf={{region.configuration.beam_center_file}}
	{% if region.beam_center_run %}DirectBeamCenter("{% filename region.beam_center_run %}")
	{% elif region.configuration.beam_center_file %}DirectBeamCenter("{% filename  region.configuration.beam_center_file %}")
	{% else %}
	{%  raise_exception "Beam center is not defined in neither Reduction nor Configuration : "|add:region.configuration.title %}
	{% endif %}

	SensitivityCorrection("/HFIR/CG2/IPTS-0828/exp165/Datafiles/CG2_exp165_scan0010_0001.xml",
		min_sensitivity=0.5, max_sensitivity=1.5, 
		dark_current="/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml",
		use_sample_dc=False)
	
	SensitivityDirectBeamCenter("/HFIR/CG2/IPTS-0828/exp165/Datafiles/CG2_exp165_scan0009_0001.xml")
	
	TransmissionDarkCurrent("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml")
	BckTransmissionDarkCurrent("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml")
	
	DirectBeamTransmission("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0092_0001.xml", "/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0020_0001.xml", beam_radius=3)
	BckDirectBeamTransmission("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0024_0001.xml", "/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0020_0001.xml", beam_radius=3)
	
	
	AppendDataFile(["/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0100_0001.xml"])
	Background("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0032_0001.xml")
	
	ThetaDependentTransmission(True)
	BckThetaDependentTransmission(True)
	
	AzimuthalAverage(n_bins=100, n_subpix=1, log_binning=True, align_log_with_decades=True, error_weighting=True)
	
	DivideByThickness(0.1)
	
	SaveIq(process='')
	# Output folder (set above)
	DataPath(os.path.joint(this_file_directory, "{{region.id}}"))
	Reduce()	

{% endfor %}
{% endfor%}


if __name__ == '__main__':
{% for region in regions%}{% for entry in region.entries %}
	p{{forloop.parentloop.counter}}{{forloop.counter}} = Process(target=reduce{{forloop.parentloop.counter}}{{forloop.counter}}, args=())
{% endfor%}{% endfor%}
{% for region in regions%}{% for entry in region.entries %}
	p{{forloop.parentloop.counter}}{{forloop.counter}}.start()
{% endfor%}{% endfor%}
{% for region in regions%}{% for entry in region.entries %}
	p{{forloop.parentloop.counter}}{{forloop.counter}}.join()
{% endfor%}{% endfor%}
    
	
	
