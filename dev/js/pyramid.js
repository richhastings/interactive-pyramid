(function($) {

    $.fn.pyramid = function( options ) {

        var activity = $(this), init, settings, feedback, step, clickStep;
        
        clickStep = function() {

            var _this = $(this),
                index = _this.index(),
                _thisFeedback = feedback.eq(index);

            feedback.removeClass('visible');
            _thisFeedback.addClass('visible').after('<div class="popupFeedbackShadow"></div>');
        };

        closeFeedback = function() {

            $(this).parent().next('.popupFeedbackShadow').remove();
            $(this).parent().removeClass('visible');
        };

        init = function() {

            // Establish default settings and 
            // override with options param (set in html)
            settings = $.extend({
                stepLength: activity.find('.step').length,
                invertedAccessible: false,
                upsideDown: false,
				step1TopPositionOverride: null
            }, options);

            if(settings.upsideDown) {
                activity.addClass('upsideDown');
            }

            step = activity.find('.step');
            feedback = activity.find('.popupFeedback');

            var widthValue = 600, //divisible by 3, 4, 5 and 6
                heightValue = 460;

            if(settings.upsideDown) {

                for(h=settings.stepLength-1;h>=0;h--) {

                    step.eq(h).css({
                        //gets steeper with fewer steps
                        'border-bottom-width': heightValue/settings.stepLength, 
                        'border-left-width':widthValue/(settings.stepLength*2),
                        'border-right-width':widthValue/(settings.stepLength*2),
                        'width': (widthValue/settings.stepLength) * (settings.stepLength - h),
                        'margin-left': (widthValue/(settings.stepLength*2)) * settings.stepLength
                    }).addClass('step' + (settings.stepLength-h));

                    step.eq(h-(settings.stepLength-1)).find('span').css({
                        'top': heightValue/settings.stepLength/2 + 'px'
                    });
                }

            } else {

                for(h=0;h<settings.stepLength;h++) {

                    step.eq(h).css({
                        //gets steeper with fewer steps
                        'border-bottom-width': heightValue/settings.stepLength, 
                        'border-left-width':widthValue/(settings.stepLength*2),
                        'border-right-width':widthValue/(settings.stepLength*2),
                        'width': (widthValue/settings.stepLength) * (h),
                        'margin-left': (widthValue/(settings.stepLength*2)) * (settings.stepLength - (h+1))
                    }).addClass('step' + (h+1));

					step.eq(h).find('span').css({
						'top': heightValue/settings.stepLength/2 + 'px'
					});
                }
            }

            step.on('click', clickStep);

            feedback.each(function() {

                $(this).append('<button>&times;</button>');
                $(this).find('div').prepend('<h3>' + step.eq($(this).index()-settings.stepLength).text() + '</h3>');
            });

            closeButton = feedback.find('button');
            closeButton.on('click', closeFeedback);
        };

        init();
    };

}(jQuery));