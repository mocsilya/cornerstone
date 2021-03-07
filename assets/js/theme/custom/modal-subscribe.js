/**
 * Adds a subscribe modal to the homepage.
 * templates > components > custom > modal-subscribe.html
 * templates > pages > home.html
*/
export default function () {
    if ($('#modalSubscribe').length > 0) {
        if(localStorage.getItem('modalSubscribe') != 'shown'){
            $('#modalSubscribe .modal-background, #modalSubscribe .modal').delay(2000).fadeIn();
            $('#modalSubscribe .modal').addClass('open').css({
                'opacity' : '1',
                'visibility' : 'visible'
            });
            localStorage.setItem('modalSubscribe','shown');
        }
        $('#modalSubscribe .modal-background, #modalSubscribe .modal-close').click(function(e){
            $('#modalSubscribe .modal-background').fadeOut();
        });
    }
}
