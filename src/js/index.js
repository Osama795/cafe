// import "bootstrap/dist/js/bootstrap.min.js";
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import "jquery/dist/jquery.min.js";
import 'popper.js/dist/popper.min';
import "@fortawesome/fontawesome-free/js/all.min";
import Swal from 'sweetalert2';
import "../sass/style.scss";

// add tooltip
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item => new bootstrap.Tooltip(item));

$(function() {
//========================================
window.onload =  () => {
    // Loading Elements
    $('.loading-overlay div').fadeOut(300, function() {
      // Show Scroll For Body
      $('body').css('overflow', 'auto');
      $(this).parent().fadeOut(300, function() {
          $(this).remove();
      });
    });
}
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
//========================================
// Creating Dynamic Tabs
$("#myTab li").on('click', function(e) {
  e.preventDefault();
  let myID = $(this).attr("id"); // Get id for li clicked
  $(this).children().tab("show"); // Add active class and remove
  $(".tabs-content .content").hide();  // Hide all div content
  $("." + myID + "-show").fadeIn("1000"); // Show content 
});
//========================================
});
//========================================
let scrollTop = document.querySelector(".scroll-top");
window.onscroll =  () => {
    // Show & Hide Scroll To Top Button On Scroll Window
    if(window.scrollY >= 400) {
      scrollTop.style.display = "flex"
    } else {
        scrollTop.style.display = "none"
    }
}
// Scroll To Top On Click 
scrollTop.onclick = () => {
  window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
  });
}
//========================================
// Add Rating
let reviewStars = document.querySelectorAll(".rating-icons span");
reviewStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    reviewStars.forEach((el) => el.classList.remove("fas", "selected"));
    for(let i = 0; i <= index; i++) {
      reviewStars[i].classList.add("fas", "rating", "selected");
    }
  });

  star.addEventListener("mouseover", () => {
    for(let i = 0; i <= index; i++) {
      reviewStars[i].classList.add("fas");
    }
  });

  star.addEventListener("mouseleave", () => {
    if(!star.classList.contains("rating")) {
      reviewStars.forEach((el) => el.classList.remove("fas"));
    }
  });
});
//========================================
// Show Message To Add To Cart Use Sweet Aleart
let addToCart = document.querySelectorAll(".add-cart");
if (addToCart) {
  addToCart.forEach((btn) => {
    btn.onclick = () => {
      Swal.fire({
        title: "تم الاضافة الي عربة الشراء",
        icon: "success",
        confirmButtonText: "حسنا",
      });
    }
  });
}
//========================================
// Calculate the price of the total product
document.querySelectorAll('[data-product-quantity]').forEach(item => {
  item.addEventListener('change', () => {
      const newQuantity = item.value;
      const parent = item.closest('[data-product-info]'); // اقرب عنصر اب
      const pricePerUnit = parent.getAttribute('data-product-price');
      const totalPriceForProduct = newQuantity * pricePerUnit
      parent.querySelector('.total-price-for-product').innerHTML = totalPriceForProduct + "$";

      calculateTotalPrice()
  });
});

// Calculation function for all products
function calculateTotalPrice() {
  let totalPriceForAllProduct = 0;
      document.querySelectorAll('[data-product-info]').forEach(product => {
          const pricePerUnite = product.getAttribute('data-product-price');
          const quantity = product.querySelector('[data-product-quantity]').value;
          const totalPriceForProduct = pricePerUnite * quantity;
          totalPriceForAllProduct = totalPriceForAllProduct + totalPriceForProduct;
      });
      document.getElementById('total-price-for-all-product').innerHTML = totalPriceForAllProduct + '$';
}

document.querySelectorAll('[data-remove-from-card]').forEach(item => {
  item.addEventListener('click', () => {
      item.closest('[data-product-info]').remove();
      calculateTotalPrice();
  });
});
//========================================

// Add this year in footer
document.getElementById("copyright").innerHTML = "جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear();