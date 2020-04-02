const content = require('./content')

module.exports = params => ***REMOVED***
  const reccos = content([
    params.answers[4].choice.label == 'Other'
      ? 'OtherOrg'
      : params.answers[4].choice.label,
    params.answers[5].choice.label == 'Other'
      ? 'OtherRole'
      : params.answers[5].choice.label
  ])

  const letters = ['A', 'B', 'C', 'D', 'E']

  return `
    <!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>*|MC:SUBJECT|*</title>
        <style type="text/css">
          /* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
          #outlook a***REMOVED***padding:0;***REMOVED*** /* Force Outlook to provide a "view in browser" message */
          .ReadMsgBody***REMOVED***width:100%;***REMOVED*** .ExternalClass***REMOVED***width:100%;***REMOVED*** /* Force Hotmail to display emails at full width */
          .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div ***REMOVED***line-height: 100%;***REMOVED*** /* Force Hotmail to display normal line spacing */
          body, table, td, p, a, li, blockquote***REMOVED***-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;***REMOVED*** /* Prevent WebKit and Windows mobile changing default text sizes */
          table, td***REMOVED***mso-table-lspace:0pt; mso-table-rspace:0pt;***REMOVED*** /* Remove spacing between tables in Outlook 2007 and up */
          img***REMOVED***-ms-interpolation-mode:bicubic;***REMOVED*** /* Allow smoother rendering of resized image in Internet Explorer */

          /* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
          body***REMOVED***margin:0; padding:0;***REMOVED***
          img***REMOVED***border:0; height:auto; line-height:100%; outline:none; text-decoration:none;***REMOVED***
          table***REMOVED***border-collapse:collapse !important;***REMOVED***
          body, #bodyTable, #bodyCell***REMOVED***height:100% !important; margin:0; padding:0; width:100% !important;***REMOVED***

          /* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */

          #bodyCell***REMOVED***padding:20px;***REMOVED***
          #templateContainer***REMOVED***width:600px;***REMOVED***

          /* ========== Page Styles ========== */

          /**
          * @tab Page
          * @section background style
          * @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
          * @theme page
          */
          body, #bodyTable***REMOVED***
            /*@editable*/ background-color:#f7f7f7;
          ***REMOVED***

          /**
          * @tab Page
          * @section background style
          * @tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
          * @theme page
          */
          #bodyCell***REMOVED***
            /*@editable*/ border-top:4px solid #BBBBBB;
          ***REMOVED***

          /**
          * @tab Page
          * @section email border
          * @tip Set the border for your email.
          */
          #templateContainer***REMOVED***
            /*@editable*/ border:1px solid #BBBBBB;
          ***REMOVED***

          /**
          * @tab Page
          * @section heading 1
          * @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
          * @style heading 1
          */
          h1***REMOVED***
            /*@editable*/ color:#202020 !important;
            display:block;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:26px;
            /*@editable*/ font-style:normal;
            /*@editable*/ font-weight:bold;
            /*@editable*/ line-height:100%;
            /*@editable*/ letter-spacing:normal;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /**
          * @tab Page
          * @section heading 2
          * @tip Set the styling for all second-level headings in your emails.
          * @style heading 2
          */
          h2***REMOVED***
            /*@editable*/ color:#404040 !important;
            display:block;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:20px;
            /*@editable*/ font-style:normal;
            /*@editable*/ font-weight:bold;
            /*@editable*/ line-height:100%;
            /*@editable*/ letter-spacing:normal;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /**
          * @tab Page
          * @section heading 3
          * @tip Set the styling for all third-level headings in your emails.
          * @style heading 3
          */
          h3***REMOVED***
            /*@editable*/ color:#606060 !important;
            display:block;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:16px;
            /*@editable*/ font-style:italic;
            /*@editable*/ font-weight:normal;
            /*@editable*/ line-height:100%;
            /*@editable*/ letter-spacing:normal;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /**
          * @tab Page
          * @section heading 4
          * @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
          * @style heading 4
          */
          h4***REMOVED***
            /*@editable*/ color:#808080 !important;
            display:block;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:14px;
            /*@editable*/ font-style:italic;
            /*@editable*/ font-weight:normal;
            /*@editable*/ line-height:100%;
            /*@editable*/ letter-spacing:normal;
            margin-top:0;
            margin-right:0;
            margin-bottom:10px;
            margin-left:0;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /* ========== Header Styles ========== */

          /**
          * @tab Header
          * @section preheader style
          * @tip Set the background color and bottom border for your email's preheader area.
          * @theme header
          */
          #templatePreheader***REMOVED***
            /*@editable*/ background-color:#F4F4F4;
            /*@editable*/ border-bottom:1px solid #CCCCCC;
          ***REMOVED***

          /**
          * @tab Header
          * @section preheader text
          * @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
          */
          .preheaderContent***REMOVED***
            /*@editable*/ color:#808080;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:10px;
            /*@editable*/ line-height:125%;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /**
          * @tab Header
          * @section preheader link
          * @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
          */
          .preheaderContent a:link, .preheaderContent a:visited, /* Yahoo! Mail Override */ .preheaderContent a .yshortcuts /* Yahoo! Mail Override */***REMOVED***
            /*@editable*/ color:#606060;
            /*@editable*/ font-weight:normal;
            /*@editable*/ text-decoration:underline;
          ***REMOVED***

          /**
          * @tab Header
          * @section header style
          * @tip Set the background color and borders for your email's header area.
          * @theme header
          */
          #templateHeader***REMOVED***
            /*@editable*/ background-color:#F4F4F4;
            /*@editable*/ border-top:1px solid #FFFFFF;
            /*@editable*/ border-bottom:1px solid #CCCCCC;
          ***REMOVED***

          /**
          * @tab Header
          * @section header text
          * @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
          */
          .headerContent***REMOVED***
            /*@editable*/ color:#505050;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:20px;
            /*@editable*/ font-weight:bold;
            /*@editable*/ line-height:100%;
            /*@editable*/ padding-top:0;
            /*@editable*/ padding-right:0;
            /*@editable*/ padding-bottom:0;
            /*@editable*/ padding-left:0;
            /*@editable*/ text-align:left;
            /*@editable*/ vertical-align:middle;
          ***REMOVED***

          /**
          * @tab Header
          * @section header link
          * @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
          */
          .headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */***REMOVED***
            /*@editable*/ color:#EB4102;
            /*@editable*/ font-weight:normal;
            /*@editable*/ text-decoration:underline;
          ***REMOVED***

          #headerImage***REMOVED***
            height:auto;
            max-width:600px;
          ***REMOVED***

          #footerImage ***REMOVED***
            height:auto;
            max-width:600px;
          ***REMOVED***

          /* ========== Body Styles ========== */

          /**
          * @tab Body
          * @section body style
          * @tip Set the background color and borders for your email's body area.
          */
          #templateBody***REMOVED***
            /*@editable*/ background-color:#ffffff;
            /*@editable*/ border-top:1px solid #FFFFFF;
            /*@editable*/ /*border-bottom:1px solid #CCCCCC;*/
          ***REMOVED***

          #templateColumns ***REMOVED***
            background-color:#ffffff;
          ***REMOVED***

          /**
          * @tab Body
          * @section body text
          * @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
          * @theme main
          */
          .bodyContent***REMOVED***
            /*@editable*/ color:#505050;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:16px;
            /*@editable*/ line-height:150%;
            padding-top:20px;
            padding-right:20px;
            padding-bottom:20px;
            padding-left:20px;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /**
          * @tab Body
          * @section body link
          * @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
          */
          .bodyContent a:link, .bodyContent a:visited, /* Yahoo! Mail Override */ .bodyContent a .yshortcuts /* Yahoo! Mail Override */***REMOVED***
            /*@editable*/ color:#EB4102;
            /*@editable*/ font-weight:normal;
            /*@editable*/ text-decoration:underline;
          ***REMOVED***

          .bodyContent img***REMOVED***
            display:inline;
            height:auto;
            max-width:560px;
          ***REMOVED***

          /* ========== Footer Styles ========== */

          /**
          * @tab Footer
          * @section footer style
          * @tip Set the background color and borders for your email's footer area.
          * @theme footer
          */
          #templateFooter***REMOVED***
            /*@editable*/ background-color:#F4F4F4;
            /*@editable*/ /*border-top:1px solid #FFFFFF;*/
          ***REMOVED***

          /**
          * @tab Footer
          * @section footer text
          * @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
          * @theme footer
          */
          .footerContent***REMOVED***
            /*@editable*/ color:#808080;
            /*@editable*/ font-family:Helvetica;
            /*@editable*/ font-size:10px;
            /*@editable*/ line-height:150%;
            padding-top:20px;
            padding-right:20px;
            padding-bottom:20px;
            padding-left:20px;
            /*@editable*/ text-align:left;
          ***REMOVED***

          /**
          * @tab Footer
          * @section footer link
          * @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
          */
          .footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */***REMOVED***
            /*@editable*/ color:#606060;
            /*@editable*/ font-weight:normal;
            /*@editable*/ text-decoration:underline;
          ***REMOVED***

          /* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */

                @media only screen and (max-width: 480px)***REMOVED***
            /* /\/\/\/\/\/\/ CLIENT-SPECIFIC MOBILE STYLES /\/\/\/\/\/\/ */
            body, table, td, p, a, li, blockquote***REMOVED***-webkit-text-size-adjust:none !important;***REMOVED*** /* Prevent Webkit platforms from changing default text sizes */
                    body***REMOVED***width:100% !important; min-width:100% !important;***REMOVED*** /* Prevent iOS Mail from adding padding to the body */

            /* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */
            #bodyCell***REMOVED***padding:10px !important;***REMOVED***

            /* /\/\/\/\/\/\/ MOBILE TEMPLATE STYLES /\/\/\/\/\/\/ */

            /* ======== Page Styles ======== */

            /**
            * @tab Mobile Styles
            * @section template width
            * @tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn't work for you, set the width to 300px instead.
            */
            #templateContainer***REMOVED***
              max-width:600px !important;
              /*@editable*/ width:100% !important;
            ***REMOVED***

            /**
            * @tab Mobile Styles
            * @section heading 1
            * @tip Make the first-level headings larger in size for better readability on small screens.
            */
            h1***REMOVED***
              /*@editable*/ font-size:24px !important;
              /*@editable*/ line-height:100% !important;
            ***REMOVED***

            /**
            * @tab Mobile Styles
            * @section heading 2
            * @tip Make the second-level headings larger in size for better readability on small screens.
            */
            h2***REMOVED***
              /*@editable*/ font-size:20px !important;
              /*@editable*/ line-height:100% !important;
            ***REMOVED***

            /**
            * @tab Mobile Styles
            * @section heading 3
            * @tip Make the third-level headings larger in size for better readability on small screens.
            */
            h3***REMOVED***
              /*@editable*/ font-size:18px !important;
              /*@editable*/ line-height:100% !important;
            ***REMOVED***

            /**
            * @tab Mobile Styles
            * @section heading 4
            * @tip Make the fourth-level headings larger in size for better readability on small screens.
            */
            h4***REMOVED***
              /*@editable*/ font-size:16px !important;
              /*@editable*/ line-height:100% !important;
            ***REMOVED***

            /* ======== Header Styles ======== */

            #templatePreheader***REMOVED***display:none !important;***REMOVED*** /* Hide the template preheader to save space */

            /**
            * @tab Mobile Styles
            * @section header image
            * @tip Make the main header image fluid for portrait or landscape view adaptability, and set the image's original width as the max-width. If a fluid setting doesn't work, set the image width to half its original size instead.
            */
            #headerImage***REMOVED***
              height:auto !important;
              /*@editable*/ max-width:600px !important;
              /*@editable*/ width:100% !important;
            ***REMOVED***

            /**
            * @tab Mobile Styles
            * @section header text
            * @tip Make the header content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
            */
            .headerContent***REMOVED***
              /*@editable*/ font-size:20px !important;
              /*@editable*/ line-height:125% !important;
            ***REMOVED***

            /* ======== Body Styles ======== */

            /**
            * @tab Mobile Styles
            * @section body image
            * @tip Make the main body image fluid for portrait or landscape view adaptability, and set the image's original width as the max-width. If a fluid setting doesn't work, set the image width to half its original size instead.
            */
            #bodyImage***REMOVED***
              height:auto !important;
              /*@editable*/ max-width:560px !important;
              /*@editable*/ width:100% !important;
            ***REMOVED***

            /**
            * @tab Mobile Styles
            * @section body text
            * @tip Make the body content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
            */
            .bodyContent***REMOVED***
              /*@editable*/ font-size:18px !important;
              /*@editable*/ line-height:125% !important;
            ***REMOVED***

            /* ======== Footer Styles ======== */

            /**
            * @tab Mobile Styles
            * @section footer text
            * @tip Make the body content text larger in size for better readability on small screens.
            */
            .footerContent***REMOVED***
              /*@editable*/ font-size:14px !important;
              /*@editable*/ line-height:115% !important;
            ***REMOVED***

            .footerContent a***REMOVED***display:block !important;***REMOVED*** /* Place footer social and utility links on their own lines, for easier access */
          ***REMOVED***
        </style>
      </head>
      <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0"
        offset="0">
        <center>
          <table align="center" border="0" cellpadding="0" cellspacing="0"
            height="100%" width="100%" id="bodyTable">
            <tr>
              <td align="center" valign="top" id="bodyCell">
                <!-- BEGIN TEMPLATE // -->
                <table border="0" cellpadding="0" cellspacing="0"
                  id="templateContainer" style="max-width: 600px; margin:0 auto;">
                  <tr>
                    <td align="center" valign="top">
                      <!-- BEGIN HEADER // -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%"
                        id="templateHeader">
                        <tr>
                          <td valign="top" class="headerContent">
                            <img
                              src="https://impacteffort.s3.amazonaws.com/email/tpp-email-header.jpg"
                              style="max-width:600px;" id="headerImage"
                              mc:label="header_image" mc:edit="header_image"
                              mc:allowdesigner mc:allowtext />
                          </td>
                        </tr>
                      </table>
                      <!-- // END HEADER -->
                    </td>
                  </tr>
                  <tr>
                    <td align="center" valign="top">
                      <!-- BEGIN BODY // -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%"
                        id="templateBody">
                        <tr>
                          <td valign="top" class="bodyContent"
                            mc:edit="body_content00">
                            <h1>Hey $***REMOVED***params.answers[0].text***REMOVED***,</h1>
                            <br />Thanks again for taking the time to fill out the
                            questionnaire!
                            What we heard was that your biggest goal or objective
                            right now
                            is the following:<br /><br />
                            <strong style="font-weight: bold;">$***REMOVED***
                              params.answers[6].text
                            ***REMOVED***</strong>
                            <br /><br />
                            One of our favorite exercises to help teams figure out
                            how they
                            might go about prioritizing ways to hit the goals and
                            objectives
                            is with a simple Effort/Impact analysis. Below is the
                            output of
                            what you shared with us using that exercise:<br /><br />
                          </td>
                        </tr>
                        <tr>
                          <td class="bodyContent" style="padding-top:0;
                            padding-bottom:0;">
                            <img
                              src="$***REMOVED***params.chart***REMOVED***"
                              style="max-width:560px;" id="bodyImage"
                              mc:label="body_image" mc:edit="body_image"
                              mc:allowtext />
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" class="bodyContent"
                            mc:edit="body_content01">
                            <ul type="A" style="padding-left: 17px; margin-top: 20px;">
                              $***REMOVED***Object.keys(params.answers.tactics)
                                .map(function(key) ***REMOVED***
                                  return `
                                    <li>
                                      <strong style="font-weight: bold;">
                                        $***REMOVED***letters[key]***REMOVED***
                                      </strong>
                                      $***REMOVED***params.answers.tactics[key].label***REMOVED***
                                    </li>
                                  `
                                ***REMOVED***)
                                .join('')***REMOVED***
                            </ul><br />
                            As you can see by the above graphic, we believe the best
                            place to prioritize all of the great ideas and tactics
                            you might have is to start with the ones that require
                            low effort to execute and a high potential impact –
                            these are the ones that fall into what we call
                            "the sweet spot".
                            <br /><br />
                            We'd love to dig and discuss your analysis with you
                            to help you plan how you might best get things in
                            motion. You can book a 30 minute time slot using the
                            link below:
                            <br /><br />
                            <a href="https://calendly.com/dsconsult">
                              <img src="https://impacteffort.s3.amazonaws.com/email/tpp-email-btn.png" />
                            </a>
                            <br /><br /><br />
                            Based on what you shared about your role and business,
                            here's a few pieces of content you might find valuable:
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top" class="bodyContent"
                            style="padding: 0 0 20px;">
                            <!-- BEGIN COLUMNS // -->
                            <table border="0" cellpadding="0" cellspacing="0"
                              width="100%"
                              id="templateColumns">
                              <tr mc:repeatable>
                                $***REMOVED***Object.keys(reccos)
                                  .map(function(key) ***REMOVED***
                                    return `<td align="center" valign="top"
                                      class="templateColumnContainer">
                                      <table border="0" cellpadding="20" cellspacing="0"
                                        width="100%">
                                        <tr>
                                          <td class="leftColumnContent">
                                            <a href="$***REMOVED***reccos[key].url***REMOVED***"><img
                                              src="$***REMOVED***reccos[key].image***REMOVED***"
                                              style="max-width:260px;"
                                              class="columnImage"
                                              mc:label="left_column_image"
                                              mc:edit="left_column_image" /></a>
                                            <p style="margin-top: 15px;"><strong>$***REMOVED***reccos[key].heading***REMOVED***</strong></p>
                                            $***REMOVED***reccos[key].description***REMOVED***
                                            <br /><br />
                                            <a href="$***REMOVED***reccos[key].url***REMOVED***" style="color: #EB4102;">Read more</a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>`
                                  ***REMOVED***)
                                  .join('')***REMOVED***
                              </tr>
                            </table>
                            <!-- // END COLUMNS -->
                          </td>
                        </tr>
                      </table>
                      <!-- // END BODY -->
                    </td>
                  </tr>
                  <tr>
                    <td align="center" valign="top">
                      <!-- BEGIN FOOTER // -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%"
                        id="templateFooter">
                        <tr>
                          <td valign="top" style="background: #232323;">
                            <img
                              src="https://impacteffort.s3.amazonaws.com/email/tpp-email-footer.jpg"
                              style="max-width:600px;" id="footerImage"
                              mc:label="footer_image" mc:edit="footer_image"
                              mc:allowdesigner mc:allowtext />
                          </td>
                        </tr>
                      </table>
                      <!-- // END FOOTER -->
                    </td>
                  </tr>
                </table>
                <!-- // END TEMPLATE -->
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>
  `
***REMOVED***
