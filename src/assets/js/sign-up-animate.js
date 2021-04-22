$(document).ready(function () {
    /*Табы на JS */
$(".dws-form").on("click", ".tab", function() {
    // Удаляем классы active
    $(".dws-form .tab").removeClass('active');

    // Добавляем классы active
    $(this).addClass('active');
    $(".dws-form").find(".active").removeClass("active");
    $(this).addClass("active");
    $(".tab-form").eq($(this).index()).addClass("active");
});

});