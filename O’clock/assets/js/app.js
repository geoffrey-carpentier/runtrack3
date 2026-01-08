$(function () {
  // Simple view switcher
  $('nav button').on('click', function () {
    const view = $(this).data('view');
    $('.view').removeClass('active');
    $(`#view-${view}`).addClass('active');
  });
});