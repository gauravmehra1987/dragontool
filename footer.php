		<!-- build:js Assets/js/lib.js --><script src="assets/js/lib.js"></script><!-- /build -->
		<!-- build:js Assets/js/app.js --><script src="assets/js/app.js"></script><!-- /build -->

		<!-- Google Analytics -->
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', Mini.thirdParty.analyticsID]);
            _gaq.push(['_trackPageview']);

            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>

        <script>window.fbAsyncInit=function(){FB.init({appId:Mini.thirdParty.facebookID,xfbml:!0,version:"v2.1"})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk");</script>
        <!--[if gt IE 8]><!--><script>window.twttr=function(a,b,c){var d,e=a.getElementsByTagName(b)[0],f=window.twttr||{};if(!a.getElementById(c))return d=a.createElement(b),d.id=c,d.src="https://platform.twitter.com/widgets.js",e.parentNode.insertBefore(d,e),f._e=[],f.ready=function(a){f._e.push(a)},f}(document,"script","twitter-wjs");</script><!--<![endif]-->

	</body>

</html>