$(function() {
    if (document.location.href.indexOf("desktop") !== -1)
        $("#container").css("backgroundColor", "black");
    update();
    var updateInterval = setInterval(update, 60000);
});

var update = function() {
    var url = $("#value").data("source");
    $.get(url, function(data) {
        var story = _.chain(data.stories)
                        .filter(function(s) { return !!s.teaser; })
                        .shuffle()
                        .first()
                        .value();
        $("#title").text(story.name ? story.name + "'s story" : "Stories");
        $("#value").text(story.teaser).ellipsis({row: 6});
    });
};

// https://github.com/STAR-ZERO/jquery-ellipsis
(function($) {
    $.fn.ellipsis = function(options) {

        var defaults = {
            'row' : 1,
            'char' : '...'
        };

        options = $.extend(defaults, options);

        this.each(function() {
            var $this = $(this);
            var text = $this.text();
            var origHeight = $this.height();

            $this.text('a');
            var rowHeight = $this.height();
            var targetHeight = rowHeight * options.row;

            if (origHeight <= targetHeight) {
                $this.text(text);
                return;
            }

            var start = 1;
            var end = text.length;

            while (start < end) {
                var length = Math.ceil((start + end) / 2);

                $this.text(text.slice(0, length) + options['char']);

                if ($this.height () <= targetHeight) {
                    start = length;
                } else {
                    end = length - 1;
                }
            }

            $this.text(text.slice(0, start) + options['char']);
        });

        return this;
    };
}) (jQuery);
