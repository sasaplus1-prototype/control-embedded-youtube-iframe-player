(function(){

  'use strict';

  window.onYouTubePlayerError = function(err) {
    console.error(err);
  };

  window.onYouTubePlayerReady = function(event) {
    console.log('onReady');
    console.log(event.target.getIframe());
    console.log(event);
  };

  window.onYouTubePlayerStateChange = function(event) {
    console.log('onStateChange');
    console.log(event.target.getIframe());
    console.log(event);
  };

  window.onYouTubeIframeAPIReady = function() {
    var playerElements = document.querySelectorAll('[class^="js-player"]'),
        playerInstances = [],
        i, len;

    for (i = 0, len = playerElements.length; i < len; ++i) {
      playerInstances.push(
        new YT.Player(playerElements[i], {
          playerVars: {
            html5: 1
          },
          events: {
            onError: window.onYouTubePlayerError
          }
        })
      );

      // NOTE: regular usage
      //playerInstances[i].addEventListener('onReady', 'onYouTubePlayerReady');
      //playerInstances[i].addEventListener('onStateChange', 'onYouTubePlayerStateChange');

      // NOTE: is it irregular usage?
      playerInstances[i].addEventListener('onReady', window.onYouTubePlayerReady);
      playerInstances[i].addEventListener('onStateChange', window.onYouTubePlayerStateChange);
    }
  };

  var youtubeScript, firstScript;

  youtubeScript = document.createElement('script');
  youtubeScript.src = 'https://www.youtube.com/iframe_api';

  firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(youtubeScript, firstScript);

}());
