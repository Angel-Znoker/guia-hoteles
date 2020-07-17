$(function() {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval: 2500
    });

    $('#contacto').on('show.bs.modal', function(e) {
        console.log('El modal se está mostrando');

        $('#contactoBtn').removeClass('btn-primary');
        $('#contactoBtn').addClass('btn-outline-success');
        $('#contactoBtn').prop('disabled', true);
    });

    $('#contacto').on('shown.bs.modal', function(e) {
        console.log('El modal se mostró');
    });

    $('#contacto').on('hide.bs.modal', function(e) {
        console.log('El modal se está ocultando');
    });

    $('#contacto').on('hidden.bs.modal', function(e) {
        console.log('El modal se ocultó');
        
        $('#contactoBtn').removeClass('btn-outline-success');
        $('#contactoBtn').addClass('btn-primary');
        $('#contactoBtn').prop('disabled', false);
    });
});