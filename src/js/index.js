// import "bootstrap/dist/js/bootstrap.min.js";
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import "jquery/dist/jquery.min.js";
import 'popper.js/dist/popper.min';
import "@fortawesome/fontawesome-free/js/all.min";
import "../sass/style.scss";

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item => new bootstrap.Tooltip(item));

$(function() {
//========================================
    // gallery
    loadGallery(true, 'a.thumbnail');

    // This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image').show();
        if (counter_max === counter_current) {
            $('#show-next-image').hide();
        } else if (counter_current === 1) {
            $('#show-previous-image').hide();
        }
    }

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image').on('click', function () {
          if ($(this).attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title').text($sel.data('title'));
        $('#image-gallery-image').attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]').each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr).on('click', function () {
          updateGallery($(this));
        });
    }
//========================================
});

document.getElementById("copyright").innerHTML = "جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear();