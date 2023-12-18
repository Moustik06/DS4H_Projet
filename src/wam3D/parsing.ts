import {ComponentFactory as Factory} from "./factory/factory";
import {HGroup} from "./factory/components/hgroup";
import {VGroup} from "./factory/components/vgroup";
/*
function getJSON() {
    return '{"name": "greyhole","filename": "greyhole.dsp","version": "2.69.0","compile_options": "-lang wasm-ib -ct 1 -cn greyhole -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/F1B4B972C94D2E6E2ED6DC1BCE3506D12A8B7D4C/web/wap"],"size": 2640980,"inputs": 2,"outputs": 2,"meta": [ { "author": "GRAME" },{ "basics_lib_name": "Faust Basic Element Library" },{ "basics_lib_tabulateNd": "Copyright (C) 2023 Bart Brouns <bart@magnetophon.nl>" },{ "basics_lib_version": "1.11.1" },{ "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "delays_lib_fdelay1a_author": "Julius O. Smith III" },{ "delays_lib_fdelay4_author": "Julius O. Smith III" },{ "delays_lib_fdelayltv_author": "Julius O. Smith III" },{ "delays_lib_name": "Faust Delay Library" },{ "delays_lib_version": "1.1.0" },{ "demos_lib_greyhole_demo_author": "Till Bovermann" },{ "demos_lib_greyhole_demo_license": "GPL2+" },{ "demos_lib_name": "Faust Demos Library" },{ "demos_lib_version": "1.1.0" },{ "description": "Greyhole demo application." },{ "filename": "greyhole.dsp" },{ "filters_lib_lowpass0_highpass1": "MIT-style STK-4.3 license" },{ "filters_lib_name": "Faust Filters Library" },{ "filters_lib_nlf2_author": "Julius O. Smith III" },{ "filters_lib_nlf2_copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters_lib_nlf2_license": "MIT-style STK-4.3 license" },{ "filters_lib_tf1_author": "Julius O. Smith III" },{ "filters_lib_tf1_copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters_lib_tf1_license": "MIT-style STK-4.3 license" },{ "filters_lib_version": "1.3.0" },{ "library_path0": "/libraries/stdfaust.lib" },{ "library_path1": "/libraries/demos.lib" },{ "library_path2": "/libraries/reverbs.lib" },{ "library_path3": "/libraries/signals.lib" },{ "library_path4": "/libraries/maths.lib" },{ "library_path5": "/libraries/delays.lib" },{ "library_path6": "/libraries/filters.lib" },{ "library_path7": "/libraries/platform.lib" },{ "library_path8": "/libraries/oscillators.lib" },{ "library_path9": "/libraries/basics.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.6.0" },{ "name": "greyhole" },{ "oscillators_lib_name": "Faust Oscillator Library" },{ "oscillators_lib_version": "1.4.0" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "1.3.0" },{ "reverbs_lib_greyhole_author": "Julian Parker, bug fixes and minor interface changes by Till Bovermann" },{ "reverbs_lib_greyhole_license": "GPL2+" },{ "reverbs_lib_name": "Faust Reverb Library" },{ "reverbs_lib_version": "1.2.0" },{ "signals_lib_name": "Faust Signal Routing Library" },{ "signals_lib_version": "1.3.0" },{ "version": "2.68.1" }],"ui": [ {"type": "vgroup","label": "Greyhole","meta": [{ "0": "" }],"items": [ {"type": "hgroup","label": "Mix","meta": [{ "0": "" }],"items": [ {"type": "hslider","label": "delayTime","shortname": "delayTime","address": "/Greyhole/Mix/delayTime","index": 529588,"meta": [{ "01": "" },{ "style": "knob" }],"init": 0.2,"min": 0.001,"max": 1.45,"step": 0.0001},{"type": "hslider","label": "damping","shortname": "damping","address": "/Greyhole/Mix/damping","index": 5216,"meta": [{ "02": "" },{ "style": "knob" }],"init": 0,"min": 0,"max": 0.99,"step": 0.001},{"type": "hslider","label": "size","shortname": "size","address": "/Greyhole/Mix/size","index": 1053924,"meta": [{ "03": "" },{ "style": "knob" }],"init": 1,"min": 0.5,"max": 3,"step": 0.0001},{"type": "hslider","label": "diffusion","shortname": "diffusion","address": "/Greyhole/Mix/diffusion","index": 529624,"meta": [{ "04": "" },{ "style": "knob" }],"init": 0.5,"min": 0,"max": 0.99,"step": 0.0001},{"type": "hslider","label": "feedback","shortname": "feedback","address": "/Greyhole/Mix/feedback","index": 5228,"meta": [{ "05": "" },{ "style": "knob" }],"init": 0.9,"min": 0,"max": 1,"step": 0.01}]},{"type": "hgroup","label": "Mod","meta": [{ "1": "" }],"items": [ {"type": "hslider","label": "modDepth","shortname": "modDepth","address": "/Greyhole/Mod/modDepth","index": 5284,"meta": [{ "06": "" },{ "style": "knob" }],"init": 0.1,"min": 0,"max": 1,"step": 0.001},{"type": "hslider","label": "modFreq","shortname": "modFreq","address": "/Greyhole/Mod/modFreq","index": 5244,"meta": [{ "07": "" },{ "style": "knob" }],"init": 2,"min": 0,"max": 10,"step": 0.01}]}]}]}';
}
function getJSON() {
    return '{"name": "autopan","filename": "autopan.dsp","version": "2.69.9","compile_options": "-lang wasm-ib -ct 1 -cn autopan -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/928627E75E1DF397B4A0A135E8E5AC25920B8466/web/wap"],"size": 524384,"inputs": 2,"outputs": 2,"meta": [ { "basics_lib_name": "Faust Basic Element Library" },{ "basics_lib_tabulateNd": "Copyright (C) 2023 Bart Brouns <bart@magnetophon.nl>" },{ "basics_lib_version": "1.11.1" },{ "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "filename": "autopan.dsp" },{ "interpolators_lib_interpolate_linear_author": "Stéphane Letz" },{ "interpolators_lib_interpolate_linear_licence": "MIT" },{ "interpolators_lib_name": "Faust Interpolator Library" },{ "interpolators_lib_remap_author": "David Braun" },{ "interpolators_lib_version": "1.3.0" },{ "library_path0": "/libraries/stdfaust.lib" },{ "library_path1": "/libraries/signals.lib" },{ "library_path2": "/libraries/maths.lib" },{ "library_path3": "/libraries/platform.lib" },{ "library_path4": "/libraries/oscillators.lib" },{ "library_path5": "/libraries/basics.lib" },{ "library_path6": "/libraries/interpolators.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.7.0" },{ "name": "autopan" },{ "oscillators_lib_name": "Faust Oscillator Library" },{ "oscillators_lib_version": "1.4.0" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "1.3.0" },{ "signals_lib_name": "Faust Signal Routing Library" },{ "signals_lib_version": "1.5.0" },{ "version": "2.69.3" }],"ui": [ {"type": "hgroup","label": "Auto Pan","items": [ {"type": "hslider","label": "Amount","shortname": "Amount","address": "/Auto_Pan/Amount","index": 524336,"meta": [{ "0": "" },{ "style": "knob" }],"init": 0,"min": 0,"max": 1,"step": 0.001},{"type": "hslider","label": "Rate","shortname": "Rate","address": "/Auto_Pan/Rate","index": 524296,"meta": [{ "1": "" },{ "scale": "log" },{ "style": "knob" },{ "unit": "Hz" }],"init": 1,"min": 0.05,"max": 90,"step": 0.001},{"type": "hslider","label": "Phase","shortname": "Phase","address": "/Auto_Pan/Phase","index": 524340,"meta": [{ "2": "" },{ "style": "knob" },{ "unit": "°" }],"init": 180,"min": 0,"max": 360,"step": 15},{"type": "hslider","label": "Shape","shortname": "Shape","address": "/Auto_Pan/Shape","index": 524324,"meta": [{ "3": "" },{ "style": "knob" }],"init": 0,"min": 0,"max": 1,"step": 0.001}]}]}';
}
function getJSON() {
    return '{"name": "compressor","filename": "compressor.dsp","version": "2.69.0","compile_options": "-lang wasm-ib -ct 1 -cn compressor -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/825D9BAFDF18F96BCFFDD0C2FD4E59C0F6F2FB29/web/wap"],"size": 68,"inputs": 2,"outputs": 2,"meta": [ { "analyzers_lib_amp_follower_ar_author": "Jonatan Liljedahl, revised by Romain Michon" },{ "analyzers_lib_name": "Faust Analyzer Library" },{ "analyzers_lib_version": "1.2.0" },{ "author": "JOS, revised by RM" },{ "basics_lib_bypass2_author": "Julius Smith" },{ "basics_lib_name": "Faust Basic Element Library" },{ "basics_lib_tabulateNd": "Copyright (C) 2023 Bart Brouns <bart@magnetophon.nl>" },{ "basics_lib_version": "1.11.1" },{ "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "compressors_lib_compression_gain_mono_author": "Julius O. Smith III" },{ "compressors_lib_compression_gain_mono_copyright": "Copyright (C) 2014-2020 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "compressors_lib_compression_gain_mono_license": "MIT-style STK-4.3 license" },{ "compressors_lib_compressor_stereo_author": "Julius O. Smith III" },{ "compressors_lib_compressor_stereo_copyright": "Copyright (C) 2014-2020 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "compressors_lib_compressor_stereo_license": "MIT-style STK-4.3 license" },{ "compressors_lib_name": "Faust Compressor Effect Library" },{ "compressors_lib_version": "1.5.0" },{ "demos_lib_compressor_demo_author": "Julius O. Smith III" },{ "demos_lib_compressor_demo_licence": "MIT" },{ "demos_lib_name": "Faust Demos Library" },{ "demos_lib_version": "1.1.0" },{ "description": "Compressor demo application" },{ "filename": "compressor.dsp" },{ "library_path0": "/libraries/stdfaust.lib" },{ "library_path1": "/libraries/demos.lib" },{ "library_path2": "/libraries/basics.lib" },{ "library_path3": "/libraries/compressors.lib" },{ "library_path4": "/libraries/maths.lib" },{ "library_path5": "/libraries/platform.lib" },{ "library_path6": "/libraries/analyzers.lib" },{ "library_path7": "/libraries/signals.lib" },{ "library_path8": "/libraries/routes.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.6.0" },{ "name": "compressor" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "1.3.0" },{ "routes_lib_name": "Faust Signal Routing Library" },{ "routes_lib_version": "1.2.0" },{ "signals_lib_name": "Faust Signal Routing Library" },{ "signals_lib_onePoleSwitching_author": "Jonatan Liljedahl, revised by Dario Sanfilippo" },{ "signals_lib_onePoleSwitching_licence": "STK-4.3" },{ "signals_lib_version": "1.3.0" },{ "version": "2.68.1" }],"ui": [ {"type": "vgroup","label": "COMPRESSOR","meta": [{ "tooltip": "Reference:         http://en.wikipedia.org/wiki/Dynamic_range_compression" }],"items": [ {"type": "hgroup","label": "0x00","meta": [{ "0": "" }],"items": [ {"type": "checkbox","label": "Bypass","shortname": "Bypass","address": "/COMPRESSOR/0x00/Bypass","index": 0,"meta": [{ "0": "" },{ "tooltip": "When this is checked, the compressor         has no effect" }]},{"type": "hbargraph","label": "Compressor Gain","shortname": "Compressor_Gain","address": "/COMPRESSOR/0x00/Compressor_Gain","index": 64,"meta": [{ "1": "" },{ "tooltip": "Current gain of     the compressor in dB" },{ "unit": "dB" }],"min": -50,"max": 10}]},{"type": "hgroup","label": "0x00","meta": [{ "1": "" }],"items": [ {"type": "hgroup","label": "Compression Control","meta": [{ "3": "" }],"items": [ {"type": "hslider","label": "Ratio","shortname": "Ratio","address": "/COMPRESSOR/0x00/Compression_Control/Ratio","index": 32,"meta": [{ "0": "" },{ "style": "knob" },{ "tooltip": "A compression Ratio of N means that for each N dB increase in input     signal level above Threshold, the output level goes up 1 dB" }],"init": 5,"min": 1,"max": 20,"step": 0.1},{"type": "hslider","label": "Threshold","shortname": "Threshold","address": "/COMPRESSOR/0x00/Compression_Control/Threshold","index": 16,"meta": [{ "1": "" },{ "style": "knob" },{ "tooltip": "When the signal level exceeds the Threshold (in dB), its level     is compressed according to the Ratio" },{ "unit": "dB" }],"init": -30,"min": -100,"max": 10,"step": 0.1}]},{"type": "hgroup","label": "Compression Response","meta": [{ "4": "" }],"items": [ {"type": "hslider","label": "Attack","shortname": "Attack","address": "/COMPRESSOR/0x00/Compression_Response/Attack","index": 12,"meta": [{ "1": "" },{ "scale": "log" },{ "style": "knob" },{ "tooltip": "Time constant in ms (1/e smoothing time) for the compression gain     to approach (exponentially) a new lower target level (the compression     `kicking in\')" },{ "unit": "ms" }],"init": 50,"min": 1,"max": 1000,"step": 0.1},{"type": "hslider","label": "Release","shortname": "Release","address": "/COMPRESSOR/0x00/Compression_Response/Release","index": 20,"meta": [{ "2": "" },{ "scale": "log" },{ "style": "knob" },{ "tooltip": "Time constant in ms (1/e smoothing time) for the compression gain     to approach (exponentially) a new higher target level (the compression     \'releasing\')" },{ "unit": "ms" }],"init": 500,"min": 1,"max": 1000,"step": 0.1}]}]},{"type": "hslider","label": "Makeup Gain","shortname": "Makeup_Gain","address": "/COMPRESSOR/Makeup_Gain","index": 44,"meta": [{ "5": "" },{ "tooltip": "The compressed-signal output level is increased by this amount     (in dB) to make up for the level lost due to compression" },{ "unit": "dB" }],"init": 40,"min": -96,"max": 96,"step": 0.1}]}]}';
}
function getJSON() {
    return '{"name": "HPF","filename": "HPF.dsp","version": "2.69.3","compile_options": "-lang wasm-ib -ct 1 -cn HPF -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/46724080972E99FC261496F6212C5810A2869950/web/wap"],"size": 28,"inputs": 1,"outputs": 1,"meta": [ { "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "filename": "HPF.dsp" },{ "library_path0": "/libraries/maxmsp.lib" },{ "library_path1": "/libraries/maths.lib" },{ "library_path2": "/libraries/platform.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.7.0" },{ "maxmsp_lib_author": "GRAME" },{ "maxmsp_lib_copyright": "GRAME" },{ "maxmsp_lib_license": "LGPL with exception" },{ "maxmsp_lib_name": "MaxMSP compatibility Library" },{ "maxmsp_lib_version": "1.1.0" },{ "name": "HPF" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "1.3.0" },{ "version": "2.69.3" }],"ui": [ {"type": "vgroup","label": "HPF","items": [ {"type": "hslider","label": "Freq","shortname": "Freq","address": "/HPF/Freq","index": 0,"init": 1000,"min": 100,"max": 10000,"step": 1},{"type": "hslider","label": "Q","shortname": "Q","address": "/HPF/Q","index": 12,"init": 1,"min": 0.01,"max": 100,"step": 0.01}]}]}';
}*/
function getJSON1() {
    return '{"name": "LPF","filename": "LPF.dsp","version": "2.69.9","compile_options": "-lang wasm-ib -ct 1 -cn LPF -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/20872F32A0BCD2B2556FF36AA75F495CC92DE571/web/wap"],"size": 28,"inputs": 1,"outputs": 1,"meta": [ { "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "filename": "LPF.dsp" },{ "library_path0": "/libraries/maxmsp.lib" },{ "library_path1": "/libraries/maths.lib" },{ "library_path2": "/libraries/platform.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.7.0" },{ "maxmsp_lib_author": "GRAME" },{ "maxmsp_lib_copyright": "GRAME" },{ "maxmsp_lib_license": "LGPL with exception" },{ "maxmsp_lib_name": "MaxMSP compatibility Library" },{ "maxmsp_lib_version": "1.1.0" },{ "name": "LPF" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "1.3.0" },{ "version": "2.69.3" }],"ui": [ {"type": "vgroup","label": "LPF","items": [ {"type": "hslider","label": "Freq","shortname": "Freq","address": "/LPF/Freq","index": 0,"init": 1000,"min": 100,"max": 10000,"step": 1},{"type": "hslider","label": "Q","shortname": "Q","address": "/LPF/Q","index": 12,"init": 1,"min": 0.01,"max": 100,"step": 0.01}]}]}';
}

// EXEMPLE CHECKBOX
function getJSON() {
    return '{"name": "exfaust99","filename": "exfaust99.dsp","version": "2.69.9","compile_options": "-lang wasm-ib -ct 1 -cn exfaust99 -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/91A3234FEA9DB49AA678260EBFCDF05F09E7033E/web/wap"],"size": 16,"inputs": 0,"outputs": 1,"meta": [ { "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "filename": "exfaust99.dsp" },{ "library_path0": "/libraries/stdfaust.lib" },{ "library_path1": "/libraries/noises.lib" },{ "name": "exfaust99" },{ "noises_lib_name": "Faust Noise Generator Library" },{ "noises_lib_version": "1.4.0" },{ "version": "2.69.3" }],"ui": [ {"type": "vgroup","label": "exfaust99","items": [ {"type": "checkbox","label": "gate","shortname": "gate","address": "/exfaust99/gate","index": 8}]}]}';
}
const factory = Factory.getInstance()

export let groups = {hgroupCount: 0, vgroupCount: 0};
export function parser() {
    const jsonString = getJSON();
    const jsonObj = JSON.parse(jsonString).ui;
    countGroupTypes(jsonObj);
    console.log(jsonObj);
    let lastComponent: any = null;
    function createComponentsFromJSON(obj: any) {
        if (obj.type) {
            let currStyle = null;
            const getStyle = (obj: any) => {
                if (obj.meta){
                    obj.meta.forEach((meta: any) => {
                        if (meta.style){
                            currStyle = meta.style;
                        }
                    });
                }else{
                    currStyle = null;
                }
            }
            getStyle(obj);
            const component = factory.createComponent(obj.type, obj.label, {
                init: obj.init,
                min: obj.min,
                max: obj.max,
                step: obj.step,
                style: currStyle || null
            });
            if (obj.items) {
                obj.items.forEach((item: any) => {
                    const childComponent = createComponentsFromJSON(item);
                    if (childComponent) {
                        if (component instanceof HGroup || component instanceof VGroup) {
                            component.addComponent(childComponent);
                        }
                    }
                });
            }
            lastComponent = component;
            return component;
        }
        return null;
    }

    jsonObj.forEach((obj: any) => {
        createComponentsFromJSON(obj);
    });
    console.log(lastComponent);
    return lastComponent;
}

function countGroupTypes(jsonData: any) {
    let hgroupCount = 0;
    let vgroupCount = 0;

    function countGroups(group: any) {
        if (group.type === 'hgroup') {
            hgroupCount++;
        } else if (group.type === 'vgroup') {
            vgroupCount++;
        }

        if (group.items && Array.isArray(group.items)) {
            group.items.forEach((item: any) => countGroups(item));
        }
    }

    if (jsonData && Array.isArray(jsonData)) {
        jsonData.forEach((group: any) => countGroups(group));
    }

    groups = {hgroupCount, vgroupCount};
    console.log(groups)
}
