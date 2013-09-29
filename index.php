<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CSS Button Generator</title>
  <link href='http://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="/js/colorpicker/css/colorpicker.css" type="text/css" />
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" />
  <link rel="stylesheet" href="/css/styles.css" />
  <link rel="stylesheet" id="dynamic-styles" />
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="js/colorpicker/js/colorpicker.js" type="text/javascript"></script>
  <script src="js/scripts.js" type="text/javascript"></script>
</head>
<body>

  <header>
    <div class="inner cf">
      <div class="logo"><img src="/images/icon_star1.png" alt=""><a href="/">CSS Button Generator</a></div>
    </div>
  </header>

  <section id="content">
    <div class="inner cf">

      <div id="settings-wrap">
        <h2>Settings</h2>
        <div id="settings-wrap-inner">
          <div class="panel-wrap active"><h3><span>+</span> Font / Text</h3></div>
          <div class="accordion-inner font cf"><div class="accordion-inner2">

            <div class="form-wrap">
              <label for="text">text:</label>
              <input type="text" name="text" value="Click me" id="text" >
            </div>

            <div class="form-wrap">
              <input type="checkbox" name="font-family-check" checked="checked" id="font-family-check" data-control="font-family" />
              <div data-control-group="font-family">
                <label for="font-family">font-family:</label>
                <select id="font-family">
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </div>
            </div>

            <div class="form-wrap">
              <input type="checkbox" name="font-color-check" checked="checked" id="font-color-check" data-control="font-color" />
              <div data-control-group="font-color">
                <label for="color">font-color:</label>
                <input class="color" type="text" name="font-color" value="#ffffff" id="color">
                <div class="color-view bg"></div>
              </div>
            </div>

            <div class="form-wrap">
              <input type="checkbox" name="font-size-check" checked="checked" id="font-size-check" data-control="font-size" />
              <div data-control-group="font-size">
                <label for="font-size">font-size:</label>
                <input class="slider-bound" type="text" name="font-size" value="20" id="font-size" max="60">
                <div id="font-size-slider"></div>
              </div>
            </div>

            <div class="form-wrap">
              <input type="checkbox" name="text-shadow-color-check" id="text-shadow-color-check" data-control="text-shadow" />
              <div data-control-group="text-shadow">
                <label for="text-shadow-color">text-shadow:</label>
                <input class="color" type="text" name="text-shadow-color" value="#666666" id="text-shadow-color" max="60">
                <div class="color-view"></div>
              </div>
            </div>

            <div data-control-group="text-shadow">

              <div class="form-wrap">
                <label for="text-shadow-x">x:</label>
                <input class="slider-bound" type="text" name="text-shadow-x" value="1" id="text-shadow-x" max="30">
                <div id="text-shadow-x-slider"></div>
              </div>

              <div class="form-wrap">
                <label for="text-shadow-y">y:</label>
                <input class="slider-bound" type="text" name="text-shadow-y" value="1" id="text-shadow-y" max="30">
                <div id="text-shadow-y-slider"></div>
              </div>


              <div class="form-wrap">
                <label for="text-shadow-blur">blur:</label>
                <input class="slider-bound" type="text" name="text-shadow-blur" value="3" id="text-shadow-blur" max="30">
                <div id="text-shadow-blur-slider"></div>
              </div>

            </div>


          </div></div><!-- end accordion-inner, accordion-inner2 -->

          <div class="panel-wrap"><h3><span>+</span> Box</h3></div>
          <div class="accordion-inner cf"><div class="accordion-inner2">

            <div class="form-wrap">
              <input type="checkbox" name="box-shadow-color-check" id="box-shadow-color-check" data-control="box-shadow" />
              <div data-control-group="box-shadow">
                <label for="box-shadow-color">box-shadow:</label>
                <input class="color" type="text" name="box-shadow-color" value="#666666" id="box-shadow-color" max="60">
                <div class="color-view"></div>
              </div>
            </div>

            <div data-control-group="box-shadow">

              <div class="form-wrap">
                <label for="box-shadow-x">x:</label>
                <input class="slider-bound" type="text" name="box-shadow-x" value="0" id="box-shadow-x" max="30">
                <div id="box-shadow-x-slider"></div>
              </div>

              <div class="form-wrap">
                <label for="box-shadow-y">y:</label>
                <input class="slider-bound" type="text" name="box-shadow-y" value="1" id="box-shadow-y" max="30">
                <div id="box-shadow-y-slider"></div>
              </div>

              <div class="form-wrap">
                <label for="box-shadow-blur">blur:</label>
                <input class="slider-bound" type="text" name="box-shadow-blur" value="3" id="box-shadow-blur" max="30">
                <div id="box-shadow-blur-slider"></div>
              </div>

            </div>

            <div class="form-wrap">
              <input type="checkbox" name="padding-check" id="padding-check" data-control="padding" />
              <div data-control-group="padding">
                <label for="padding">padding:</label>
                <input class="slider-bound" type="text" name="padding" value="10" id="padding" max="40">
                <div id="padding-slider"></div>
              </div>
            </div>

            <div data-control-group-switch="padding">

              <div class="form-wrap">
                <input type="checkbox" name="padding-top-check" checked="checked" id="padding-top-check" data-control="padding-top" />
                <div data-control-group="padding-top">
                  <label for="padding-top">padding-top:</label>
                  <input class="slider-bound" type="text" name="padding-top" value="10" id="padding-top" max="40">
                  <div id="padding-top-slider"></div>
                </div>
              </div>
              <div class="form-wrap">
                <input type="checkbox" name="padding-right-check" checked="checked" id="padding-right-check" data-control="padding-right" />
                <div data-control-group="padding-right">
                  <label for="padding-right">padding-right:</label>
                  <input class="slider-bound" type="text" name="padding-right" value="20" id="padding-right" max="40">
                  <div id="padding-right-slider"></div>
                </div>
              </div>
              <div class="form-wrap">
                <input type="checkbox" name="padding-bottom-check" checked="checked" id="padding-bottom-check" data-control="padding-bottom" />
                <div data-control-group="padding-bottom">
                  <label for="padding-bottom">padding-bottom:</label>
                  <input class="slider-bound" type="text" name="padding-bottom" value="10" id="padding-bottom" max="40">
                  <div id="padding-bottom-slider"></div>
                </div>
              </div>
              <div class="form-wrap">
                <input type="checkbox" name="padding-left-check" checked="checked" id="padding-left-check" data-control="padding-left" />
                <div data-control-group="padding-left">
                  <label for="padding-left">padding-left:</label>
                  <input class="slider-bound" type="text" name="padding-left" value="20" id="padding-left" max="40">
                  <div id="padding-left-slider"></div>
                </div>
              </div>

            </div>

          </div></div><!-- end accordion-inner, accordion-inner2 -->

          <div class="panel-wrap"><h3><span>+</span> Border</h3></div>
          <div class="accordion-inner cf"><div class="accordion-inner2">

            <div class="form-wrap">
              <input type="checkbox" name="border-radius-check" checked="checked" id="border-radius-check" data-control="border-radius" />
              <div data-control-group="border-radius">
                <label for="border-radius">border-radius:</label>
                <input class="slider-bound" type="text" name="border-radius" value="28" id="border-radius" max="60">
                <div id="border-radius-slider" class="slider"></div>
              </div>
            </div>

            <div class="form-wrap">
              <input type="checkbox" name="border-color-check" id="border-color-check" data-control="border" />
              <div data-control-group="border">
                <label for="border-color">border:</label>
                <input class="color" type="text" name="border-color" value="#1f628d" id="border-color" max="60">
                <div class="color-view"></div>
              </div>
            </div>
            <div data-control-group="border">
              <div class="form-wrap">
                <label for="border-style">border-style:</label>
                <select id="border-style">
                  <option id="solid">solid</option>
                  <option id-"dotted">dotted</option>
                </select>
              </div>
              <div class="form-wrap">
                <label for="border-width">border-width:</label>
                <input class="slider-bound" type="text" name="border-width" value="2" id="border-width" max="20">
                <div id="border-width-slider"></div>
              </div>
            </div>
            <a href="" class="more-link" data-section="border">More</a>

            <div class="more" data-section-more="border">
              <div data-control-group-switch="border">
                <!-- border-top -->
                <div class="form-wrap">
                  <input type="checkbox" name="border-top-color-check" id="border-top-color-check" data-control="border-top" />
                  <div data-control-group="border-top">
                    <label for="border-top-color">border-top:</label>
                    <input class="color" type="text" name="border-top-color" value="#666666" id="border-top-color">
                    <div class="color-view"></div>
                  </div>
                </div>
                <div data-control-group="border-top">
                  <div class="form-wrap">
                    <label for="border-top-style">border-top-style:</label>
                    <select id="border-top-style">
                      <option id="solid">solid</option>
                      <option id-"dotted">dotted</option>
                    </select>
                  </div>
                  <div class="form-wrap">
                    <label for="border-top-width">border-top-width:</label>
                    <input class="slider-bound" type="text" name="border-top-width" value="1" id="border-top-width" max="20">
                    <div id="border-top-width-slider"></div>
                  </div>
                </div>
                <!-- border-right -->
                <div class="form-wrap">
                  <input type="checkbox" name="border-right-color-check" id="border-right-color-check" data-control="border-right" />
                  <div data-control-group="border-right">
                    <label for="border-right-color">border-right:</label>
                    <input class="color" type="text" name="border-right-color" value="#666666" id="border-right-color">
                    <div class="color-view"></div>
                  </div>
                </div>
                <div data-control-group="border-right">
                  <div class="form-wrap">
                    <label for="border-right-style">border-right-style:</label>
                    <select id="border-right-style">
                      <option id="solid">solid</option>
                      <option id-"dotted">dotted</option>
                    </select>
                  </div>
                  <div class="form-wrap">
                    <label for="border-right-width">border-right-width:</label>
                    <input class="slider-bound" type="text" name="border-right-width" value="1" id="border-right-width" max="20">
                    <div id="border-right-width-slider"></div>
                  </div>
                </div>
                <!-- border-bottom -->
                <div class="form-wrap">
                  <input type="checkbox" name="border-bottom-color-check" id="border-bottom-color-check" data-control="border-bottom" />
                  <div data-control-group="border-bottom">
                    <label for="border-bottom-color">border-bottom:</label>
                    <input class="color" type="text" name="border-bottom-color" value="#666666" id="border-bottom-color">
                    <div class="color-view"></div>
                  </div>
                </div>
                <div data-control-group="border-bottom">
                  <div class="form-wrap">
                    <label for="border-bottom-style">border-bottom-style:</label>
                    <select id="border-bottom-style">
                      <option id="solid">solid</option>
                      <option id-"dotted">dotted</option>
                    </select>
                  </div>
                  <div class="form-wrap">
                    <label for="border-bottom-width">border-bottom-width:</label>
                    <input class="slider-bound" type="text" name="border-bottom-width" value="1" id="border-bottom-width" max="20">
                    <div id="border-bottom-width-slider"></div>
                  </div>
                </div>
                <!-- border-left -->
                <div class="form-wrap">
                  <input type="checkbox" name="border-left-color-check" id="border-left-color-check" data-control="border-left" />
                  <div data-control-group="border-left">
                    <label for="border-left-color">border-left:</label>
                    <input class="color" type="text" name="border-left-color" value="#666666" id="border-left-color">
                    <div class="color-view"></div>
                  </div>
                </div>
                <div data-control-group="border-left">
                  <div class="form-wrap">
                    <label for="border-left-style">border-left-style:</label>
                    <select id="border-left-style">
                      <option id="solid">solid</option>
                      <option id-"dotted">dotted</option>
                    </select>
                  </div>
                  <div class="form-wrap">
                    <label for="border-left-width">border-left-width:</label>
                    <input class="slider-bound" type="text" name="border-left-width" value="1" id="border-left-width" max="20">
                    <div id="border-left-width-slider"></div>
                  </div>
                </div>
              </div>
            </div>

          </div></div><!-- end accordion-inner, accordion-inner2 -->


          <div class="panel-wrap"><h3><span>+</span> Background</h3></div>
          <div class="accordion-inner cf"><div class="accordion-inner2">
            <div class="form-wrap">
              <input type="checkbox" name="background-check" checked="checked" id="background-check" data-control="background" />
              <div data-control-group="background">
                <label for="background">background:</label>
                <div class="radio-wrap">
                  <input type="radio" name="background" value="" id="background-gradient" data-control-display="background-gradient" checked="checked"><label>gradient</label>
                  <input type="radio" name="background" value="" id="background-solid" data-control-display="background-solid"><label>solid</label>
                  <div class="clear"></div>
                </div>
              </div>
            </div>

            <div data-control-group="background">

              <div id="gradient-wrap" data-control-display-group="background-gradient" data-control-display-selector="background">
                <div class="form-wrap">
                  <label for="bg-start-gradient">start color:</label>
                  <input class="color" type="text" name="color" value="#3498db" id="bg-start-gradient">
                  <div class="color-view bg"></div>
                </div>

                <div class="form-wrap">
                  <label for="bg-end-gradient">end color:</label>
                  <input class="color" type="text" name="color" value="#2980b9" id="bg-end-gradient">
                  <div class="color-view bg"></div>
                </div>
              </div><!-- end #gradient-wrap -->

              <div id="solid-wrap" data-control-display-group="background-solid" data-control-display-selector="background">
                <div class="form-wrap">
                  <label for="background">color:</label>
                  <input class="color" type="text" name="color" value="#3498db" id="background">
                  <div class="color-view bg"></div>
                </div>
              </div>

            </div>

          </div></div><!-- end accordion-inner, accordion-inner2 -->

          <div class="panel-wrap"><h3><span>+</span> Hover</h3></div>
          <div class="accordion-inner last cf"><div class="accordion-inner2">
            <div class="form-wrap">
              <input type="checkbox" name="background-check" checked="checked" id="background-hover-check" data-control="hover-background" />
              <div data-control-group="hover-background">
                <label for="background-hover">background:</label>
                <div class="radio-wrap">
                  <input type="radio" name="hover-background" value="" id="background-gradient-hover" data-control-display="hover-background-gradient" checked="checked"><label>gradient</label>
                  <input type="radio" name="hover-background" value="" id="background-solid-hover" data-control-display="hover-background-solid"><label>solid</label>
                  <div class="clear"></div>
                </div>
              </div>
            </div>

            <div data-control-group="hover-background">

              <div id="gradient-hover-wrap" data-control-display-group="hover-background-gradient" data-control-display-selector="hover-background">
                <div class="form-wrap">
                  <label for="bg-start-gradient-hover">start color:</label>
                  <input class="color" type="text" name="color" value="#3cb0fd" id="bg-start-gradient-hover">
                  <div class="color-view bg"></div>
                </div>

                <div class="form-wrap">
                  <label for="bg-end-gradient-hover">end color:</label>
                  <input class="color" type="text" name="color" value="#3498db" id="bg-end-gradient-hover">
                  <div class="color-view bg"></div>
                </div>
              </div><!-- end #gradient-wrap -->

              <div id="solid-hover-wrap" data-control-display-group="hover-background-solid" data-control-display-selector="hover-background">
                <div class="form-wrap">
                  <label for="background-hover">color:</label>
                  <input class="color" type="text" name="color" value="#3cb0fd" id="background-hover">
                  <div class="color-view bg"></div>
                </div>
              </div>

            </div>

          </div></div><!-- end accordion-inner, accordion-inner2 -->
          <div class="clear"></div>
        </div><!-- end settings-wrap-inner -->
      </div><!-- end settings-wrap -->


      <div id="button-wrap">
        <h2>Button preview</h2>
        <div id="button-wrap-inner">
          <a class="btn" href="">Click me</a>
        </div><!-- end button-wrap-inner -->
      </div><!-- end button-wrap -->

      <div id="styles-wrap">
        <h2>CSS code</h2>
        <div id="styles-wrap-inner">
          <div id="css-display"></div>
        </div><!-- end styles-wrap-inner -->
      </div><!-- end styles-wrap -->

    </div>
  </section>

  <footer>
    <div class="inner cf">
      <div class="left company">
        <h4><img src="/images/icon_star3.png" alt=""> bxCreative</h4>
        <p>Chicago, IL &bull; <?php print date('Y'); ?></p>
      </div>

      <div class="left community">
        <h4>bxCommunity</h4>
        <p><a href="http://bxslider.com" target="_blank">bxslider.com</a> <span class="bullet">&bull;</span> <a href="http://bxcreative.com">bxcreative</a> <span class="bullet">&bull;</span> <a href="http://bxcollective.com">bxcollective.com</a></p>
      </div>
    </div>
  </footer>

  <script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36499930-4']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

  </script>

</body>
</html>