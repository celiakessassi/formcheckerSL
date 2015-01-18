/**
 *  form checker for jQuery, version 1.2.9
 *  (c) 2014 celiaks
 *
 *  form checker for jQuery is freely distributable.
 *  For details, see the git repository : https://github.com/celiaks/formcheckerSL.git
 *  or visit owr page http://celiaks.github.io/formcheckerSL/
 *
 */
// -Check required input or textarea
// -Check email Syntax
// -Check if equal to a specific value
// -Set limit length
// -Allow onlly numbers
// -Set allowed characters
// -Add a fail function
// -Add a callback function
// -Add an ajax function
(function($) {

  $.fn.formcheckerSL = function(options) {
    var form = this;

    var settings = $.extend({
      // These are the defaults.
      button: $('input[type="submit"]', this),
      required: 'data-champrequired',
      email: 'data-emailsytax',
      number: 'data-onlynumber',
      maxlength: 'data-maxlength',
      AllawedChar: 'data-AllawedChar',
      MustEqualTo: 'data-MustEqualTo',
      preventDefault: false,
      requiredEmpty: function(element) {
        alert('please enter all required');
        element.focus();
      },
      InvalidEmailFunction: function(element) {
        alert('invalide email sentax');
        element.focus();
      },
      NotEqualFunction: function(element) {
        alert(element.val() + ' not equal to ' + element.attr('data-MustEqualTo'));
        element.focus();
      },
      succesfunctioncallback: function(form) {
        alert('success');
      },
    }, options);


    function numberonllykeypress() {}

    function checkemail(str) {
      var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      if (filter.test(str))
        testresults = true
      else {
        testresults = false
      }
      return (testresults)
    }

    function ValidEmailFunction() {

    }

    function NotEqualFunction(element) {
      alert(element.val() + ' not equal to ' + element.attr(settings.MustEqualTo));
    }

    function InvalidEmailFunction() {

    }

    function test(form) {
      continue_submit = true;
      var name_element_clicked = $(this).data('name');
      $('textarea, input , select ', form).each(function(index, element) {
        /*check if all required are not empty */
        var value = $(this).val();
        if (value==null) {value='' ; }     

        if ($(this).attr(settings.required)) {
  

          if (
            (((value.length == 0) & (!$(this).is(':checkbox'))) == 1) |
            (($(this).is(':checkbox')) & ($(this).is(':checked')) == 0) |
            (($(this).is('select'))&($(this).val()==null))
          ) {
            continue_submit = false;
            settings.requiredEmpty($(this));
            return false;
          }
        }
        //<!-- check if all email have a correct syntax   --> 
        if (continue_submit) {
          if ($(this).attr(settings.email)) {
            if (value.length > 0) {
              if (checkemail(value)) {
                ValidEmailFunction($(this));
              } else {
                settings.InvalidEmailFunction($(this));
                continue_submit = false;
                return false
              }
            }
          }
        }
        /*check if aqul to specific value*/
        if (continue_submit) {
          if ($(this).attr(settings.MustEqualTo)) {
            if (value == $(this).attr(settings.MustEqualTo)) {
              /*is equal */
            } else {
              settings.NotEqualFunction($(this));
              continue_submit = false;
              return false;
            }

          }

        }


      });


      return continue_submit;
    }

    function keypreses() {
      //keypresses----------------------------------------------//

    }

    v_avec_blem = 0;
    //only number key press ------------------------- START ----------------------------------  
    $('input, textarea', this).keypress(function(event) {
      var numero = String.fromCharCode(event.keyCode);
      var myArrayNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      index = myArrayNumber.indexOf(numero); // 1
      var longeur = $(this).val().length;
      if ($(this).attr(settings.maxlength)) {
        var max_length = $(this).attr(settings.maxlength);
      } else {
        var max_length = false;
      }

      if (window.getSelection) {
        Selected = window.getSelection().toString();
      }
      if ($(this).attr(settings.AllawedChar)) {
        var charAllowed = $(this).attr(settings.AllawedChar);
        AllawedCharIndex = charAllowed.indexOf(numero); // 1
        if (AllawedCharIndex >= 0) {} else return false;

      }

      if (max_length) {

        if ((longeur < max_length) | (Selected.length > 0)) {} else {
          return false;
        }
      };
      //action for NUMBER ONLY
      if ($(this).attr(settings.number)) {
        under_max_length = true;
        if ($(this).attr(settings.maxlength)) {
          if (!(longeur < max_length)) {
            under_max_length = false;
          }
        }
        if ((index >= 0) & (Selected.length > 0)) {

        } else if (index >= 0 & under_max_length) {} else {
          var nom = $(this).val();
          var th = $(this);
          if (nom.length == 0) {
            v_avec_blem = 1;
          }
          return false;
        }
      };

    });
    //only number key press -------------------FIN-----------------------------------     


    settings.button.on('click', function(e) {

      if (settings.preventDefault) {
        e.preventDefault();
      }
      var res = test(form);

      if (res) {
        //alert(res);
        settings.succesfunctioncallback(form);

      }

      if (!res) {
        return false;
      }
 


    });


  };

}(jQuery));
