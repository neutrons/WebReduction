#!/usr/bin/env python

# imports section
import sys,os,glob, filecmp, datetime, shutil
sys.path.append("/opt/mantidnightly/bin")
from mantid.simpleapi import *
import mantid.plots.helperfunctions as hf
import numpy
from numpy import array #for UB
numpy.seterr(all='ignore')
import warnings
warnings.filterwarnings('ignore',module='numpy')
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt

'''
Script generation for reduction
Title: {{ title}}
User: {{ user }}
Intrument: {{instrument_name}}
IPTS Number: {{ipts_number}}
'''

# variables for template
#this part changes with web input


# Configuration start
norm_file = '/SNS/HYS/shared/autoreduce/V_3p8meV_Aug31_2017.nxs'
correct_transmission=False
Emin_fraction=""
Emax_fraction=""
Estep_meV=""

MaskBTPParameters=[]
MaskBTPParameters.append({'Pixel': '1-8,121-128'})

SaveMDEvents=True


# Configuration end

# Reduction start

Q1_projection="1,1,0"
Q2_projection="0,0,1"
Q3_projection="-1,1,0"

UB_a="6.12"
UB_b="6.12"
UB_c="6.12"
UB_alpha="90"
UB_beta="90"
UB_gamma="90"
UB_uVector="1,1,0"
UB_vVector="0,0,1"

plotParameters=[]
# Axis0-3 can be Q1,Q2,Q3,DeltaE

plotParameters.append({'Name':'HHL',
                       'Axis0':'Q1',
                       'Axis0_min':-3,
                       'Axis0_max':3,
                       'Axis0_Nsteps':200,
                       'Axis1':'Q2',
                       'Axis1_min':-2,
                       'Axis1_max':5,
                       'Axis1_Nsteps':200,
                       'Axis2':'Q3',
                       'Axis2_min':-.5,
                       'Axis2_max':.5,
                       'Axis3':'DeltaE',
                       'Axis3_min':-2.5,
                       'Axis3_max':5.5})

plotParameters.append({'Name':'HH3',
                       'Axis0':'Q1',
                       'Axis0_min':-3,
                       'Axis0_max':3,
                       'Axis0_Nsteps':200,
                       'Axis1':'DeltaE',
                       'Axis1_min':0,
                       'Axis1_max':15,
                       'Axis1_Nsteps':200,
                       'Axis2':'Q3',
                       'Axis2_min':-.5,
                       'Axis2_max':.5,
                       'Axis3':'Q2',
                       'Axis3_min':2.9,
                       'Axis3_max':3.1})


# Reduction end

# reduction function
def do_reduction(filename,output_dir):
    config['default.facility'] = "SNS"

    data = LoadEventNexus(filename)

    if len(CheckForSampleLogs(Workspace = data, LogNames = 'pause')) == 0:
        data = FilterByLogValue(InputWorkspace = data, LogName = 'pause', MinimumValue = '-1',MaximumValue = '0.5')

    #data = FilterBadPulses(InputWorkspace = data, LowerCutoff = '5.')
    run_number = str(data.getRunNumber())
    out_prefix = "HYS_" + run_number
    nxs_filename = os.path.join(output_dir,"event/" + out_prefix + "_events.nxs")
    nxspe_filename_4pix = os.path.join(output_dir, "4pixel/" + out_prefix + "_4pixel.nxspe")
    nxspe_filename_tube = os.path.join(output_dir, "msk_tube/" + out_prefix + "_msk_tube.nxspe")
    mde_nxs_filename = os.path.join(output_dir,"mde/" + out_prefix + "_mde.nxs")
    mdh_base_filename = os.path.join(output_dir,"mdh/HYS_mdh_")

    # Check for sample logs
    checkResult = CheckForSampleLogs(Workspace=data, LogNames='s2, msd, EnergyRequest, psr, psda, omega')
    if len(checkResult):
        raise ValueError(checkResult)

    run_obj = data.getRun()
    Ei = run_obj['EnergyRequest'].getStatistics().mean
    omega = run_obj['omega'].getStatistics().mean

    if Emin_fraction=="":
        emin=-2.0*Ei
    else:
        emin=float(Emin_fraction)*Ei
    if Emax_fraction=="":
        emax=0.95*Ei
    else:
        emax=float(Emax_fraction)*Ei


    if Ei > 3.0:
        estep = 0.02
    if Ei > 4.9:
        estep = 0.05
    if Ei > 9.9:
        estep = 0.1
    if Ei > 19.9:
        estep = 0.2
    if Ei > 29.0:
        estep = 0.25
    if Ei > 39.0:
        estep = 0.5

    if Estep_meV!="":
        estep=float(Estep_meV)

    #move 0 meV energy transfer to a bin center
    emin = (int(emin/estep)+0.5)*estep
    energy_bins = "%f,%f,%f" % (emin, estep, emax)

    #get msd
    msd = run_obj['msd'].getStatistics().mean
    #get tofmin and tofmax, and filter out anything else
    tel = (39000+msd+4500)*1000/numpy.sqrt(Ei/5.227e-6)
    tofmin = tel-1e6/120-470
    tofmax = tel+1e6/120+470
    data = CropWorkspace(InputWorkspace = data, XMin = tofmin, XMax = tofmax)

    # Rotate instrument for polarized operations.
    additional_pars={}
    psda=run_obj['psda'].getStatistics().mean
    psr=run_obj['psr'].getStatistics().mean
    offset=psda*(1.-psr/4200.)
    if int(run_number) in range(160163,163120):
        offset*=-1.
    if offset!=0:
        RotateInstrumentComponent(Workspace=data,ComponentName='Tank',X=0, Y=1,Z=0,Angle=offset,RelativeRotation=1)
        IntegratedIncoh = Load(norm_file)
        additional_pars['UseProcessedDetVan'] = 1
        additional_pars['DetectorVanadiumInputWorkspace'] = IntegratedIncoh

    omega = run_obj['omega'].getStatistics().mean

    #TIB limits
    if Ei==15:
        tib=[22000.,23000.]
    else:
        tib = SuggestTibHYSPEC(Ei)

    for d in MaskBTPParameters:
        MaskBTP(data,**d)

    #data for new normalization
    dgs,_=DgsReduction(SampleInputWorkspace=data,
                       IncidentEnergyGuess=Ei,
                       SampleInputMonitorWorkspace=data,
                       IncidentBeamNormalisation='None',
                       EnergyTransferRange=energy_bins,
                       TimeIndepBackgroundSub='1',
                       TibTofRangeStart=tib[0],
                       TibTofRangeEnd=tib[1],
                       SofPhiEIsDistribution='0')
    dgs=CropWorkspace(InputWorkspace=dgs, XMin = emin, XMax = emax)
    SaveNexus(Filename=nxs_filename, InputWorkspace=dgs)

    #4 pixel nxspe
    dgs4,_=DgsReduction(SampleInputWorkspace=data,
                        IncidentEnergyGuess=Ei,
                        EnergyTransferRange=energy_bins,
                        SampleInputMonitorWorkspace=data,
		                GroupingFile='/SNS/HYS/shared/autoreduce/4x1pixels.xml',
		                IncidentBeamNormalisation='ByCurrent',
		                TimeIndepBackgroundSub='1',
		                TibTofRangeStart=tib[0],
		                TibTofRangeEnd=tib[1],
		                **additional_pars)

    if correct_transmission:
        dgs4c=CorrectTransmissionPolarizer(dgs4,Ei)
        dgs4=CloneWorkspace(dgs4c)
    SaveNXSPE(Filename=nxspe_filename_4pix, InputWorkspace=dgs4, Psi=str(omega), KiOverKfScaling='1')

    #tube nxspe
    MaskBTP(data,Pixel="1-40,89-128")
    #MaskBTP(data,Bank="20",Tube="6-8")
    dgst,_=DgsReduction(SampleInputWorkspace=data,
                        IncidentEnergyGuess=Ei,
                        EnergyTransferRange=energy_bins,
                        SampleInputMonitorWorkspace=data,
		                GroupingFile='/SNS/HYS/shared/autoreduce/128x1pixels.xml',
		                IncidentBeamNormalisation='ByCurrent',
		                TimeIndepBackgroundSub='1',
		                TibTofRangeStart=tib[0],
		                TibTofRangeEnd=tib[1],
		                **additional_pars)
    SaveNXSPE(Filename=nxspe_filename_tube, InputWorkspace=dgst, Psi=str(omega), KiOverKfScaling='1')

    # do the powder plot
    plot_html=''
    run_number='185574'
    try:
        from postprocessing.publish_plot import plot_heatmap, publish_plot
        minvals,maxvals=ConvertToMDMinMaxLocal(dgs4,'|Q|','Direct')
        xmin=minvals[0]
        xmax=maxvals[0]
        ymin=minvals[1]
        ymax=maxvals[1]
        MD=ConvertToMD(dgs4,
                       QDimensions='|Q|',
                       dEAnalysisMode='Direct',
                       MinValues=minvals,
                       MaxValues=maxvals)
        ad0='|Q|,'+str(xmin)+','+str(xmax)+',100'
        ad1='DeltaE,'+str(ymin)+','+str(ymax)+',100'
        MDH=BinMD(InputWorkspace=MD,AlignedDim0=ad0,AlignedDim1=ad1)
        x,y,z=hf.get_md_data2d_bin_bounds(MDH,hf.get_normalization(MDH)[0])
        cmin=get_colorscale_minimum(z)
        z[z<cmin]=numpy.nan
        Zm=numpy.ma.masked_where(numpy.isnan(z),z)
        Zm = numpy.log(Zm)
        myplot=plot_heatmap(run_number, x.tolist(), y.tolist(), Zm.tolist(), x_title=u'|Q| (1/\u212b)', y_title='E (meV)',
                            x_log=False, y_log=False, instrument='HYS', publish=False)
        plot_html+="<div>{0}</div>\n".format(myplot)
    except Exception as e:
        print e
    #try to merge MD into sets
    try:
        comment=dgs.getRun()['file_notes'].value.strip().replace(' ','_')

        if comment!='' and comment!='(unset)' and ('powder' not in comment):
            UB_DAS=dgs.getRun()['BL14B:CS:UBMatrix'].value[0]
            try:
                SetUB(dgs,eval(UB_DAS))
            except:
                pass

            # override UB with the one in autoreduction
            # should fail if fields are empty
            try:
                a=float(UB_a)
                b=float(UB_b)
                c=float(UB_c)
                alpha=float(UB_alpha)
                beta=float(UB_beta)
                gamma=float(UB_gamma)
                SetUB(dgs,a=a,b=b,c=c,alpha=alpha,beta=beta,gamma=gamma,u=UB_uVector,v=UB_vVector)
            except Exception as e:
                print e

            #Create the mde file
            minValues,maxValues=ConvertToMDMinMaxLocal(InputWorkspace=dgs,
                                                       QDimensions='Q3D',
                                                       dEAnalysisMode='Direct',
                                                       Q3DFrames='HKL',
                                                       QConversionScales='HKL',
                                                       Uproj=Q1_projection,
                                                       Vproj=Q2_projection,
                                                       Wproj=Q3_projection)

            mdpart=ConvertToMD(dgs,
                               QDimensions='Q3D',
                               dEAnalysisMode='Direct',
                               Q3DFrames="HKL",
                               QConversionScales="HKL",
                               MinValues=minValues,
                               MaxValues=maxValues,
                               UProj=Q1_projection,
                               VProj=Q2_projection,
                               WProj=Q3_projection)
            #Save the mde file
            if SaveMDEvents:
                SaveMD(mdpart,Filename=mde_nxs_filename)

            #try to load the corresponding dataset and add to it
            validate_plot_params(plotParameters)
            for p in plotParameters:
                SCplots=[]
                try:
                    name=comment+'_'+p['Name']
                    d,n=generate_slice(mdpart,
                                       mdh_base_filename,
                                       name,
                                       ','.join([dim_name(p['Axis0']),str(p['Axis0_min']),str(p['Axis0_max']),str(p['Axis0_Nsteps'])]),
                                       ','.join([dim_name(p['Axis1']),str(p['Axis1_min']),str(p['Axis1_max']),str(p['Axis1_Nsteps'])]),
                                       ','.join([dim_name(p['Axis2']),str(p['Axis2_min']),str(p['Axis2_max']),'1']),
                                       ','.join([dim_name(p['Axis3']),str(p['Axis3_min']),str(p['Axis3_max']),'1']))
                    mdslice=DivideMD(d,n,OutputWorkspace=name)
                    x,y,z=hf.get_md_data2d_bin_bounds(mdslice,hf.get_normalization(mdslice)[0])
                    cmin=get_colorscale_minimum(z)
                    z[z<cmin]=numpy.nan
                    Zm=numpy.ma.masked_where(numpy.isnan(z),z)
                    Zm = numpy.log(Zm)
                    SCplots.append(plot_heatmap(run_number, x.tolist(), y.tolist(), Zm.tolist(),
                                                x_title=dim_name(p['Axis0']), y_title=dim_name(p['Axis1']),
                                                x_log=False, y_log=False, instrument='HYS', publish=False))
                    plot_html+="<div>{0}</div>\n".format(SCplots[-1])
                except Exception as e:
                    logger.error("Something bad occured during the image processing for {0}".format(name))
                    logger.error(repr(e))
    except Exception as e:
        logger.error("Something bad occured during MD processing")
        logger.error(repr(e))
    publish_plot("HYS", run_number, files={'file': plot_html})



# correction function
def CorrectTransmissionPolarizer(WS,EFixed):
	#DeltaE-Ei=-Ef
	WS=ScaleX(WS,Factor=-EFixed,Operation="Add")
	WS=ExponentialCorrection(WS,C0=1/0.585,C1=1/10.77,Operation="Multiply") #was 58.5% *exp(-Ef/12.07)
	WS=ScaleX(WS,Factor=EFixed,Operation="Add")
	return WS

#helper functions
def translation(number,character):
    if number==0:
        return '0'
    if number==1:
        return character
    if number==-1:
        return '-'+character
    if number==int(number):
        number=int(number)
    return str(number)+character


def dim_name(name):
    if name=='DeltaE':
        return name
    chars=['H','K','L']
    name_to_basis={'Q1':Q1_projection,'Q2':Q2_projection,'Q3':Q3_projection}
    basis=numpy.array(name_to_basis[name].split(','),dtype=float)
    indexMax=numpy.argmax(numpy.abs(basis))
    return '['+','.join([translation(x,chars[indexMax]) for x in basis])+']'


def validate_plot_params(param_list):
    names=[]
    for p in param_list:
        name=p['Name']
        if name in names:
            raise ValueError('Slice name {0} appears multiple times'.format(name))
        else:
            names.append(name)
        if len(set([p['Axis0'],p['Axis1'],p['Axis2'],p['Axis3']]))!=4:
            raise ValueError('There are repeating dimensions in slice {0}'.format(name))
        #TODO: validate min<max, and number of points


def check_newer_script(instrument, folder):
    """
    Checks if reduce_instrument.py is in a certain folder.
    It searches for all reduce_instrument*.py, takes the newest one and compares the content with
    /SNS/instrument/shared/autoreduce/reduce_instrument.py. If there is no such file in the folder,
    or the content has changed, it will copy reduce_instrument.py to reduce_instrument_date_and_time.py
    in folder.
    The function raises OSError if /SNS/instrument/shared/autoreduce/reduce_instrument.py is not found
    """
    master_filename="/SNS/"+instrument+"/shared/autoreduce/reduce_"+instrument+".py"
    search_pattern=os.path.join(folder,"reduce_"+instrument+"*.py")
    result=glob.glob(search_pattern)
    newer_file_exists=True
    if result:
        # there are reduce_... files, get the newest
        newest_filename=max(result,key=os.path.getctime)
        #check content. If the same, then there is no newer file
        newer_file_exists=not filecmp.cmp(master_filename,newest_filename)
    if newer_file_exists:
        new_filename=os.path.join(folder,"reduce_"+instrument+"_"+datetime.datetime.now().strftime('%Y.%m.%d_%H.%M.%S')+".py")
        shutil.copy2(master_filename,new_filename)
    return newer_file_exists



def get_colorscale_minimum(arr):
    x=arr[numpy.isfinite(arr)]
    x=x[x>0]
    xc=x[numpy.argsort(x)][len(x)*0.02] #ignore the bottom 2%
    return xc



def generate_slice(ws,mdh_base_filename,extra_name,ad0,ad1,ad2,ad3):
    filenameMD_data=mdh_base_filename+extra_name+"_data.nxs"
    filenameMD_norm=mdh_base_filename+extra_name+"_norm.nxs"
    if mtd.doesExist('mdh_data'):
        DeleteWorkspace('mdh_data')
    if mtd.doesExist('mdh_norm'):
        DeleteWorkspace('mdh_norm')
    try:
        LoadMD(filenameMD_data,LoadHistory=False,OutputWorkspace='mdh_data')
        LoadMD(filenameMD_norm,LoadHistory=False,OutputWorkspace='mdh_norm')
    except:
        pass
    MDNormDirectSC(InputWorkspace=ws,
                   SkipSafetyCheck=True,
                   TemporaryDataWorkspace='mdh_data' if mtd.doesExist('mdh_data') else None,
                   TemporaryNormalizationWorkspace='mdh_norm' if mtd.doesExist('mdh_norm') else None,
                   AlignedDim0=ad0,
                   AlignedDim1=ad1,
                   AlignedDim2=ad2,
                   AlignedDim3=ad3,
                   OutputWorkspace='mdh_data',
                   OutputNormalizationWorkspace='mdh_norm')
    SaveMD('mdh_data', Filename=filenameMD_data)
    SaveMD('mdh_norm', Filename=filenameMD_norm)
    return (mtd['mdh_data'],mtd['mdh_norm'])

if __name__ == "__main__":
    #check number of arguments
    if (len(sys.argv) != 3):
        print "autoreduction code requires a filename and an output directory"
        sys.exit()
    if not(os.path.isfile(sys.argv[1])):
        print "data file ", sys.argv[1], " not found"
        sys.exit()
    else:
        path = sys.argv[1]
        out_dir = sys.argv[2]
        check_newer_script('HYS',out_dir)
        do_reduction(path, out_dir)