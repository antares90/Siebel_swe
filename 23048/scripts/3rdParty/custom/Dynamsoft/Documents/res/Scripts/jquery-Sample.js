var aryDemo = {
    categories:
                [
                    {
                        name: "Get Started", type: "core", demos:
                            [
                                {
                                    name: "Hello World",
                                    API: [
                                        {
                                            name: "SelectSource()", APILink: "Documents/Help/Methods/method%20SelectSource.htm"
                                        },
                                        {
                                            name: "OpenSource()", APILink: "Documents/Help/Methods/method%20OpenSource.htm"
                                        },
                                        {
                                            name: "AcquireImage()", APILink: "Documents/Help/Methods/method%20AcquireImage.htm"
                                        }],
                                    desc: "Hello World of Dynamic Web TWAIN", link: "Samples/Getting Started/HelloWorld.html", className: "demo1", screenshotLink: ""
                                },
                                {
                                    name: "Use Event",
                                    API: [
                                        {
                                            name: "OnWebTwainReady", APILink: "Documents/Help/Events/Event%20OnWebTwainReady.htm"
                                        },
                                        {
                                            name: "OnPostAllTransfers", APILink: "Documents/Help/Events/Event%20OnPostAllTransfers.htm"
                                        },
                                        {
                                            name: "Width", APILink: "Documents/Help/Properties/prop%20Width.htm"
                                        },
                                        {
                                            name: "Height", APILink: "Documents/Help/Properties/prop%20Height.htm"
                                        }],
                                    desc: "Register built-in Dynamic Web TWAIN Events", link: "Samples/Getting Started/UseEvent.html", className: "demo2", screenshotLink: ""
                                }
                            ]
                    },
                    {
                        name: "Scan", type: "core", demos:
                            [
                                {
                                    name: 'Scan from source list',
                                    API: [
                                        {
                                            name: "AcquireImage()", APILink: "Documents/Help/Methods/method%20AcquireImage.htm"
                                        },
                                        {
                                            name: "SelectSourceByIndex()", APILink: "Documents/Help/Methods/method%20SelectSourceByIndex.htm"
                                        }],
                                    desc: "Scan images from a source in the drop down menu", link: "Samples/Scan/SourceList.html", className: "demo3", screenshotLink: ""
                                },
                                {
                                    name: 'Scan without UI',
                                    API: [
                                        {
                                            name: "IfShowUI", APILink: "Documents/Help/Properties/prop%20IfShowUI.htm"
                                        }],
                                    desc: "Scan images with or without scanner UI", link: "Samples/Scan/ScanWithoutUI.html", className: "demo4", screenshotLink: ""
                                },
                                {

                                    name: 'Scan with autofeeder',
                                    API: [
                                        {
                                            name: "IfFeederEnabled", APILink: "Documents/Help/Properties/prop%20IfFeederEnabled.htm"
                                        }],
                                    desc: "Scan images with or without feeder enabled", link: "Samples/Scan/AutoFeeder.html", className: "demo5", screenshotLink: ""
                                },
                                {
                                    name: 'Scan and Save',
                                    API: [
                                        {
                                            name: "OnPostAllTransfers", APILink: "Documents/Help/Events/Event%20OnPostAllTransfers.htm"
                                        },
                                        {
                                            name: "OnPostTransfer", APILink: "Documents/Help/Events/Event%20OnPostTransfer.htm"
                                        },
                                        {
                                            name: "SaveAsJPEG()", APILink: "Documents/Help/Methods/method%20SaveAsJPEG.htm"
                                        },
                                        {
                                            name: "SaveAllAsMultiPageTIFF()", APILink: "Documents/Help/Methods/method%20SaveAllAsMultiPageTIFF.htm"
                                        },
                                        {
                                            name: "SaveAllAsPDF()", APILink: "Documents/Help/Methods/method%20SaveAllAsPDF.htm"
                                        }],
                                    desc: "Scan image(s) and save them automatically", link: "Samples/Load Save/SaveImages.html", className: "demo16", screenshotLink: ""
                                },
                                {
                                    name: 'Custom Scan',
                                    API: [
                                        {
                                            name: "Resolution", APILink: "Documents/Help/Properties/prop%20Resolution.htm"
                                        },
                                        {
                                            name: "PixelType", APILink: "Documents/Help/Properties/prop%20PixelType.htm"
                                        },
                                        {
                                            name: "IfShowUI", APILink: "Documents/Help/Properties/prop%20IfShowUI.htm"
                                        },
                                        {
                                            name: "IfFeederEnabled", APILink: "Documents/Help/Properties/prop%20IfFeederEnabled.htm"
                                        }],
                                    desc: "Scan image with customized resolution and pixel type", link: "Samples/Scan/CustomScan.html", className: "demo6", screenshotLink: ""
                                }
                            ]
                    },
                    {
                        name: "Load Save", type: "core", demos:
                            [
                                {
                                    name: 'Load local',
                                    API: [
                                        {
                                            name: "LoadImageEx()", APILink: "Documents/Help/Methods/method%20LoadImageEx.htm"
                                        }],
                                    desc: "Load image(s) from local drive", link: "Samples/Load Save/SaveImages.html", className: "demo13", screenshotLink: ""
                                },
                                {
                                    name: 'Save image',
                                    API: [
                                        {
                                            name: "OnPostAllTransfers", APILink: "Documents/Help/Events/Event%20OnPostAllTransfers.htm"
                                        },
                                        {
                                            name: "OnPostTransfer", APILink: "Documents/Help/Events/Event%20OnPostTransfer.htm"
                                        },
                                        {
                                            name: "SaveAsJPEG()", APILink: "Documents/Help/Methods/method%20SaveAsJPEG.htm"
                                        },
                                        {
                                            name: "SaveAllAsMultiPageTIFF()", APILink: "Documents/Help/Methods/method%20SaveAllAsMultiPageTIFF.htm"
                                        },
                                        {
                                            name: "SaveAllAsPDF()", APILink: "Documents/Help/Methods/method%20SaveAllAsPDF.htm"
                                        }],
                                    desc: "Scan or load image(s) and save them automatically", link: "Samples/Load Save/SaveImages.html", className: "demo14", screenshotLink: ""
                                }
                            ]
                    },
                    {
                        name: "Upload Download", type: "core", demos:
                            [
                                {
                                    name: 'HTTP Upload',
                                    API: [
                                        {
                                            name: "HTTPUploadThroughPost()", APILink: "Documents/Help/Methods/method%20HTTPUploadThroughPost.htm"
                                        },
                                        {
                                            name: "HTTPUploadAllThroughPostAsMultiPageTIFF()", APILink: "Documents/Help/Methods/method%20HTTPUploadAllThroughPostAsMultiPageTIFF.htm"
                                        },
                                        {
                                            name: "HTTPUploadAllThroughPostAsPDF()", APILink: "Documents/Help/Methods/method%20HTTPUploadAllThroughPostAsPDF.htm"
                                        }],
                                    desc: "Upload images to the server", link: "Samples/Upload Download/Visual Studio Demo/UploadWithHTTP.html", className: "demo7", screenshotLink: "Documents/res/Images/UploadWithHTTP.png"
                                },
                                {
                                    name: 'Send extra info',
                                    API: [
                                        {
                                            name: "ClearAllHTTPFormField()", APILink: "Documents/Help/Methods/method%20ClearAllHTTPFormField.htm"
                                        },
                                        {
                                            name: "SetHTTPFormField()", APILink: "Documents/Help/Methods/method%20SetHTTPFormField.htm"
                                        }],
                                    desc: "Send Extra info with the images to the server", link: "Samples/Upload Download/Visual Studio Demo/SendExtraInfo.html", className: "demo17", screenshotLink: "Documents/res/Images/SendExtraInfo.png"
                                },
                                {
                                    name: 'HTTP Download',
                                    API: [{
                                        name: "HTTPDownload()", APILink: "Documents/Help/Methods/method%20HTTPDownload.htm"
                                    }],
                                    desc: "Download images from the server", link: "Samples/Upload Download/Visual Studio Demo/DownloadWithHTTP.html", className: "demo12", screenshotLink: "Documents/res/Images/DownloadWithHTTP.png"
                                }
                            ]
                    },
                    {
                        name: "Edit", type: "core", demos:
                            [
                                {
                                    name: 'Show editor',
                                    API: [
                                        {
                                            name: "ShowImageEditor()", APILink: "Documents/Help/Methods/method%20ShowImageEditor.htm"
                                        }],
                                    desc: "Show Dynamic Web TWAIN's built-in image editor", link: "Samples/Edit/ShowEditor.html", className: "demo10", screenshotLink: ""
                                },
                                {
                                    name: 'Custom edit',
                                    API: [
                                        {
                                            name: "RotateLeft()", APILink: "Documents/Help/Methods/method%20RotateLeft.htm"
                                        },
                                        {
                                            name: "RotateRight()", APILink: "Documents/Help/Methods/method%20RotateRight.htm"
                                        },
                                        {
                                            name: "Mirror()", APILink: "Documents/Help/Methods/method%20Mirror.htm"
                                        },
                                        {
                                            name: "Flip()", APILink: "Documents/Help/Methods/method%20Flip.htm"
                                        },
                                        {
                                            name: "HowManyImagesInBuffer", APILink: "Documents/Help/Properties/prop%20HowManyImagesInBuffer.htm"
                                        }],
                                    desc: "Rotate, mirror or flip an image", link: "Samples/Edit/Edit.html", className: "demo11", screenshotLink: ""
                                }
                            ]
                    },
                    {
                        name: "Display", type: "core", demos:
                            [
                                {
                                    name: 'Navigation',
                                    API: [
                                        {
                                            name: "SetViewMode()", APILink: "Documents/Help/Methods/method%20SetViewMode.htm"
                                        },
                                        {
                                            name: "OnMouseClick", APILink: "Documents/Help/Events/Event%20OnMouseClick.htm"
                                        },
                                        {
                                            name: "CurrentImageIndexInBuffer", APILink: "Documents/Help/Properties/prop%20CurrentImageIndexInBuffer.htm"
                                        },
                                        {
                                            name: "HowManyImagesInBuffer", APILink: "Documents/Help/Properties/prop%20HowManyImagesInBuffer.htm"
                                        }],
                                    desc: "Navigate images with custom preview mode", link: "Samples/Display/Navigation.html", className: "demo8", screenshotLink: ""
                                },
                                {
                                    name: 'Thumbnail',
                                    API: [
                                        {
                                            name: "CopyToClipboard()", APILink: "Documents/Help/Methods/method%20CopyToClipboard.htm"
                                        },
                                        {
                                            name: "LoadDibFromClipboard()", APILink: "Documents/Help/Methods/method%20LoadDibFromClipboard.htm"
                                        },
                                        {
                                            name: "OnWebTwainReady", APILink: "Documents/Help/Events/Event%20OnWebTwainReady.htm"
                                        },
                                        {
                                            name: "OnPostTransfer", APILink: "Documents/Help/Events/Event%20OnPostTransfer.htm"
                                        },
                                        {
                                            name: "OnPostLoad", APILink: "Documents/Help/Events/Event%20OnPostLoad.htm"
                                        },
                                        {
                                            name: "OnMouseClick", APILink: "Documents/Help/Events/Event%20OnMouseClick.htm"
                                        }],
                                    desc: "Thumbnails sample with two controls", link: "Samples/Thumbnail/Thumbnail.html", className: "demo9", screenshotLink: ""
                                }
                            ]
                    },
                    {
                        name: "Barcode", type: "addon", demos:
                            [
                                {
                                    name: 'Read barcode',
                                    API: [
                                        {
                                            name: "Addon.Barcode.Read()", APILink: "Documents/Help/Methods/method%20Addon.Barcode.Read.htm"
                                        }],
                                    desc: "Read barcode", link: "Samples/Addon/Barcode/ReadBarcode.html", className: "demo15", screenshotLink: ""
                                }
                            ]
                    },
					{
					    name: "Webcam", type: "addon", demos:
                            [
                                {
                                    name: 'Webcam',
                                    API: [
                                        {
                                            name: "Addon.Webcam.CaptureImage()", APILink: "Documents/Help/Methods/method%20Addon.Webcam.CaptureImage.htm"
                                        }],
                                    desc: "Capture images from your webcam", link: "Samples/Addon/Webcam/Webcam.html", className: "demo18", screenshotLink: ""
                                }
                            ]
					},
					{
					    name: "PDFRasterizer", type: "addon", demos:
                            [
                                {
                                    name: 'PDF Rasterizer',
                                    API: [
                                        {
                                            name: "Addon.PDF.Download()", APILink: "Documents/Help/Methods/method%20Addon.PDF.Download.htm"
                                        },
                                        {
                                            name: "Addon.PDF.SetResolution()", APILink: "Documents/Help/Methods/method%20Addon.PDF.SetResolution.htm"
                                        },
                                        {
                                            name: "Addon.PDF.SetConvertMode()", APILink: "Documents/Help/Methods/method%20Addon.PDF.SetConvertMode.htm"
                                        },
                                        {
                                            name: "LoadImageEx()", APILink: "Documents/Help/Methods/method%20LoadImageEx.htm"
                                        }],
                                    desc: "PDF Rasterizer", link: "Samples/Addon/PDFRasterizer/PDFRasterizer.html", className: "demo19", screenshotLink: ""
                                }
                            ]
					}
                ]
};

function loadDemos() {
    $("#demoCat").empty();
    $("#demoAddonCat").empty();
    for (var i = 0; i < aryDemo.categories.length; i++) {
        if (aryDemo.categories[i].demos != null) {
            if (aryDemo.categories[i].type == "addon") {
                for (var j = 0; j < aryDemo.categories[i].demos.length; j++) {
                    $("#demoAddonCat").append("<li class='demo'><a class='" + aryDemo.categories[i].demos[j].className + "'>" + aryDemo.categories[i].name + "</a></li>");
                }
            }
            else {
                var strList = "";
                for (var g = 0; g < aryDemo.categories[i].demos.length; g++) {
                    strList += "<li class='demo'><a class='" + aryDemo.categories[i].demos[g].className + "'>" + aryDemo.categories[i].demos[g].name + "</a></li>";
                }
                if (i == 0) {
                    $("#demoCat").append("<li class='liCat expand'><span><i></i>" + aryDemo.categories[i].name + "</span><ul class='demoList'>" + strList + "</ul></li>");
                }
                else {
                    $("#demoCat").append("<li class='liCat'><span><i></i>" + aryDemo.categories[i].name + "</span><ul class='demoList'>" + strList + "</ul></li>");
                }
            }
        }
    }
}

// collapse demos
$("#demoCat li.liCat span").live("click", function () {
    $(this).parent(".liCat").toggleClass("expand");
})


$(".demo a").live("click", function () {
    var currentDemo = $(this).attr("class");
    $(".catList li").removeClass("CurrentDemo");
    $(this).closest("li").addClass("CurrentDemo");
    $(".demoCode").hide();
    var strPath = window.location.href;
    strPath = strPath.substring(0, strPath.lastIndexOf("/") + 1);
    for (var i = 0; i < aryDemo.categories.length; i++) {
        for (var j = 0; j < aryDemo.categories[i].demos.length; j++) {
            if (aryDemo.categories[i].demos[j].className == currentDemo) {
                $("#demoDesc").html(aryDemo.categories[i].demos[j].desc);
                /******************If non-IE on Win, view source******************/
                ua = (navigator.userAgent.toLowerCase());
                if (ua.indexOf("msie") == -1 && ua.indexOf('trident') == -1)
                    strPath = "view-source:" + strPath;
                /*****************************************************************/
                $("#demoLink").html("The complete source code can be found at <a href='" + strPath + aryDemo.categories[i].demos[j].link + "' target='_blank'>{Installation Directory}/" + aryDemo.categories[i].demos[j].link + "</a>");
                if (aryDemo.categories[i].demos[j].screenshotLink == "") {
                    $("#frmDemo").attr("src", aryDemo.categories[i].demos[j].link);
                }
                else {
                    $("#frmDemo").attr("src", aryDemo.categories[i].demos[j].screenshotLink);
                }
                var strAPI = "";
                for (var k = 0; k < aryDemo.categories[i].demos[j].API.length; k++) {
                    if (strAPI != "") {
                        strAPI += ", ";
                    }
                    if (aryDemo.categories[i].demos[j].API[k].APILink != null) {
                        strAPI += "<a href='" + aryDemo.categories[i].demos[j].API[k].APILink + "' target='_blank'>" + aryDemo.categories[i].demos[j].API[k].name + "</a>";
                    }
                    else {
                        strAPI += aryDemo.categories[i].demos[j].API[k].name;
                    }
                }
                $("#spnDemoAPIName").html(strAPI);
            }
        }
    }

    $("." + currentDemo + "").show();
})
$("#viewSource").live("click", function () {
    $("#demoSource").toggle();
})