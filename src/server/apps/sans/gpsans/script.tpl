{% extends "../script_base.tpl" %}

{% block header%}
from reduction_workflow.instruments.sans.hfir_command_interface import *
{% endblock header%}

{% block body%}
GPSANS()
SetSampleDetectorDistance(6850)
SetWavelength(6.08, 0.15)
SolidAngle(detector_tubes=True)
DarkCurrent("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml")
MonitorNormalization()

SetAbsoluteScale(1)
AzimuthalAverage(n_bins=100, n_subpix=1, log_binning=True, align_log_with_decades=True, error_weighting=True)
IQxQy(nbins=300)
SetWedges(number_of_wedges=2, wedge_angle=30, wedge_offset=0)

DirectBeamCenter("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0020_0001.xml")
SensitivityCorrection("/HFIR/CG2/IPTS-0828/exp165/Datafiles/CG2_exp165_scan0010_0001.xml",
	min_sensitivity=0.5, max_sensitivity=1.5, 
	dark_current="/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml",
	use_sample_dc=False)

SensitivityDirectBeamCenter("/HFIR/CG2/IPTS-0828/exp165/Datafiles/CG2_exp165_scan0009_0001.xml")

TransmissionDarkCurrent("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml")
BckTransmissionDarkCurrent("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0014_0001.xml")

DirectBeamTransmission("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0092_0001.xml", "/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0020_0001.xml", beam_radius=3)
BckDirectBeamTransmission("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0024_0001.xml", "/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0020_0001.xml", beam_radius=3)

DataPath("/HFIR/CG2/IPTS-15029/exp155/Shared")
AppendDataFile(["/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0100_0001.xml"])
Background("/HFIR/CG2/IPTS-15029/exp155/Datafiles/CG2_exp155_scan0032_0001.xml")

ThetaDependentTransmission(True)
BckThetaDependentTransmission(True)


DivideByThickness(0.1)

SaveIq(process='')
Reduce()

{% endblock body%}