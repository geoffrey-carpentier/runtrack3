// version simplifiée : conserve victoryCombination et position du curseur lors du drag
$(function () {
    const victoryCombination = [
        "dropzone-1_arc1.png",
        "dropzone-2_arc2.png",
        "dropzone-3_arc3.png",
        "dropzone-4_arc4.png",
        "dropzone-5_arc5.png",
        "dropzone-6_arc6.png"
    ];

    let currentCombination = ["", "", "", "", "", ""];
    const total = currentCombination.length;

    const $palette = $('#palette');
    const $slots = $('.slot');
    const $message = $('#message');
    const $shuffle = $('#shuffle');
    const $target = $('#target');

    function filenameOf($img) {
        const src = $img.prop('currentSrc') || $img.attr('src') || '';
        return src.split('/').pop();
    }

    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
        return true;
    }

    function checkVictory() {
        const filled = currentCombination.filter(Boolean).length;
        if (filled === total && arraysEqual(currentCombination, victoryCombination)) {
            $message.removeClass('hidden').text('Vous avez gagné ! 🎉');
            $target && $target.addClass('win');
        } else if (filled === total) {
            $message.removeClass('hidden').text('Vous avez perdu.');
            $target && $target.removeClass('win');
        } else {
            $message.addClass('hidden').text('');
            $target && $target.removeClass('win');
        }
    }

    // initialise draggables ; on mousedown on image on calcule l'offset du clic
    function makeDraggables() {
        $palette.find('img').each(function () {
            const $img = $(this);

            // destroy previous draggable if exists
            if ($img.data('ui-draggable')) {
                try { $img.draggable('destroy'); } catch (e) { }
            }

            // remove visual placement classes
            $img.removeClass('placed').css({ width: '100%', height: '100%', cursor: 'grab', margin: 0, padding: 0 });

            // default cursorAt center (fallback)
            const defaultCursorAt = { left: Math.floor($img.width() / 2), top: Math.floor($img.height() / 2) };

            $img.draggable({
                helper: 'clone',
                revert: 'invalid',
                appendTo: 'body',
                zIndex: 2000,
                cursorAt: defaultCursorAt,
                start(e, ui) {
                    // keep helper same visual size
                    ui.helper.css({ width: $(this).width(), height: $(this).height() });
                }
            });

            // record click offset and update cursorAt option so helper keeps same relative cursor point
            $img.off('mousedown.setCursorAt').on('mousedown.setCursorAt', function (e) {
                const pos = $(this).offset();
                const clickX = Math.max(0, Math.min(Math.round(e.pageX - pos.left), $(this).width()));
                const clickY = Math.max(0, Math.min(Math.round(e.pageY - pos.top), $(this).height()));
                try {
                    // update draggable option for this element so jQuery UI uses that cursorAt for the upcoming drag
                    $(this).draggable('option', 'cursorAt', { left: clickX, top: clickY });
                } catch (err) {
                    // ignore
                }
            });
        });
    }

    // droppables
    $slots.each(function () {
        const $slot = $(this);
        if (!$slot.attr('id')) $slot.attr('id', 'dropzone-' + $slot.data('slot'));
        const slotIndex = Number($slot.data('slot')) - 1;

        $slot.droppable({
            accept: function ($draggable) {
                return $draggable.closest('#palette').length > 0 && !$draggable.hasClass('placed');
            },
            tolerance: 'pointer',
            hoverClass: 'slot-hover',
            drop(event, ui) {
                if ($slot.children('img').length) return;
                const $orig = ui.draggable;
                $orig.appendTo($slot).css({ position: 'static', top: '', left: '', width: '100%', height: '100%', cursor: 'default', margin: 0, padding: 0 });
                try { $orig.draggable('disable'); } catch (e) { }
                $orig.addClass('placed');

                const fname = filenameOf($orig);
                currentCombination[slotIndex] = `${$slot.attr('id')}_${fname}`;

                $slot.addClass('dropped');
                setTimeout(() => $slot.removeClass('dropped'), 220);

                checkVictory();
            }
        });
    });

    // shuffle / reset
    function randomizeDistribution() {
        const imgs = $('#palette img, .slot img').toArray();
        for (let i = imgs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
        }
        $('.slot').empty();
        $palette.empty().append(imgs);
        currentCombination = ["", "", "", "", "", ""];
        $message.addClass('hidden').text('');
        $target && $target.removeClass('win');
        makeDraggables();
    }

    $shuffle.on('click', randomizeDistribution);

    // init
    makeDraggables();
    randomizeDistribution();
});