
var ViewOne = $('.view-1');
var ViewTwo = $('.view-2');
var ViewThree = $('.view-3');
var ViewFour = $('.view-4');
var ViewFive = $('.view-5');
var ViewSix = $('.view-6');


var viewFourFooter = "<b>Note:</b> This is for illustration purpose only. For more details and illustration of higher sum assured amount, you should refer to the Benefit Illustration, which can be obtained from your AIA Financial Services Consultant.";


//------------------------------------------------------------------------------
// View 1
//------------------------------------------------------------------------------

$('.btn-yes').click(function() {
  $(this).parent().children().removeClass('active');
  $(this).addClass('active');
});

$('.btn-no').click(function() {
  $(this).parent().children().removeClass('active');
  $(this).addClass('active');
});

$('#btn-view-one-next').click(function() {
  ViewOne.css('display', 'none');

  var btnYesHaveActive = $('.ul-option-container').find('.li-md').children('.btn-yes.active');
  console.log(btnYesHaveActive);
  if (btnYesHaveActive.length > 0) {
    ViewThree.css('display', 'block');
  } else {
    ViewTwo.css('display', 'block');
  }
});


//------------------------------------------------------------------------------
// View 2
//------------------------------------------------------------------------------

$('#btn-view-two-next').click(function() {
  ViewTwo.css('display', 'none');
  ViewThree.css('display', 'block');
});


//------------------------------------------------------------------------------
// View 3
//------------------------------------------------------------------------------

$('#btn-view-three-next').click(function() {
  ViewThree.css('display', 'none');
  ViewFour.css('display', 'block');
});


//------------------------------------------------------------------------------
// View 4
// gender:
//    0: female
//    1: male
// smoker:
//    0: non-smoker
//    1: smoker
//------------------------------------------------------------------------------

var smokeErrorMessage = $('.div-smoke-option-error-message');
var ageDisableMask = $('.age-disable-mask');
var coveredDisableMask = $('.covered-disable-mask')
var smokerDisableMask = $('.smoker-disable-mask');
var ageValue = $('.span-age-text');
var coveredValue = $('.span-covered-text');
var maxPageWidth = 874;
var maxAge = 65;
var maxCovered = 45;
var startCovered = 50;
var endCovered = 500;
var smokeAble = 16;
var gender = -1;
var smoker = -1;
var age = -1;
var ageValueAtWidth = -1;
var covered = -1;
var coveredValueAtWidth = -1;


//--- Gender -------------------------------------------------------------------

function enableSmokerAndButtonClear() {
  $('.btn-view-four-clear').removeClass('disable');
  smokerDisableMask.css('display', 'none');
}

function activeMale() {
  gender = 1;
  enableSmokerAndButtonClear();
  $('.img-male').addClass('selected');
  $('.img-female').removeClass('selected');
}

function activeFamle() {
  gender = 0;
  enableSmokerAndButtonClear();
  $('.img-female').addClass('selected');
  $('.img-male').removeClass('selected');
}

$('.img-female').click(function() {
  activeFamle();
});

$('.img-male').click(function() {
  activeMale();
});


//--- smoker -------------------------------------------------------------------

function enableAgeScollbar() {
  ageDisableMask.css('display', 'none');
}

function showSmokeErrorMessage() {
  smokeErrorMessage
  .addClass('shake')
  .fadeIn(function() {
    setTimeout(function() {
      smokeErrorMessage.removeClass('shake').fadeOut();
    }, 2000);
  });
}

function activeSmoker() {
  smoker = 1;
  enableAgeScollbar();
  $('.img-smoker').addClass('selected');
  $('.img-non-smoker').removeClass('selected');
}

function activeNonSmoker() {
  smoker = 0;
  enableAgeScollbar();
  $('.img-smoker').removeClass('selected');
  $('.img-non-smoker').addClass('selected');
};

$('.img-smoker').click(function() {
  if (age < smokeAble) {
    activeNonSmoker();
    showSmokeErrorMessage();
  } else {
    activeSmoker();
  }
});

$('.img-non-smoker').click(function() {
  activeNonSmoker();
});


//--- Age pointer --------------------------------------------------------------

function enableNextButtonCoveredScollbar() {
  $('.btn-view-four-next').removeClass('disable');
  coveredDisableMask.css('display', 'none');
}

$('.div-age-pointer').draggable({
  axis: "x",
  grid: [ maxPageWidth/maxAge, 0 ],
  containment:[-0.2, 0, maxPageWidth, 0],
  drag: function(event) {
    enableNextButtonCoveredScollbar();

    var pointer = $(this);
    setTimeout(function() {
      ageCalculater(pointer, null);
    }, 100);
  }
});

function ageCalculater(pointer, value) {
  if (pointer == null && value == null) {
    return;
  }
  if (value == null) {
    value = pointer.position().left;
  }

  ageValueAtWidth = value; // for storage
  age = Math.floor(value / (maxPageWidth / maxAge)) + 1; // plus 1 to rounding up.
  //console.log(value, age);

  if (age < smokeAble) {
    if (smoker == 1) {
      showSmokeErrorMessage();
    }
    activeNonSmoker();
  }

  if (value < 1) {
    age = 0;
    ageValue.html("2 WEEKS");
  } else if (age == 1) {
    age = 1;
    ageValue.html("1 YEAR");
  } else if (age >= maxAge){
    age = maxAge;
    ageValue.html(maxAge + " YEARS");
  } else {
    ageValue.html(age + " YEARS");
  }
};


//--- covered pointer ----------------------------------------------------------

$('.div-covered-pointer').draggable({
  axis: "x",
  grid: [maxPageWidth/maxCovered, 0],
  containment:[-0.1, 0, maxPageWidth, 0],
  drag: function(event) {
    var pointer = $(this);
    setTimeout(function() {
      coveredCalculater(pointer, null);
    }, 100);
  }
});

function coveredCalculater(pointer, value) {
  if (pointer == null && value == null) {
    return;
  }
  if (value == null) {
    value = pointer.position().left;
  }

  coveredValueAtWidth = value; // for storage
  covered = startCovered + (Math.floor(value / (maxPageWidth / maxCovered)) + 1) * 10;
  //console.log(value, covered);

  if (value <= 0) {
    covered = startCovered;
    coveredValue.html("S$" + startCovered + "K");
  } else if (value >= maxPageWidth) {
    covered = endCovered;
    coveredValue.html("S$" + endCovered + "K");
  } else {
    coveredValue.html("S$" + covered + "K");
  }
};


//--- Next and Clear -----------------------------------------------------------

function clearGender() {
  gender = -1;
  window.localStorage.setItem("gender", gender);

  $('.img-male').removeClass('selected');
  $('.img-female').removeClass('selected');
};

function clearSmoker() {
  smoker = -1;
  window.localStorage.setItem("smoker", smoker);

  $('.img-smoker').removeClass('selected');
  $('.img-non-smoker').removeClass('selected');
  smokerDisableMask.css('display', 'block');
};

function clearAgeAndCovered() {
  age = -1;
  covered = -1;
  window.localStorage.setItem("age", age);
  window.localStorage.setItem("covered", covered);
  window.localStorage.setItem("ageValueAtWidth", -1);
  window.localStorage.setItem("coveredValueAtWidth", -1);

  $('.span-age-text').html('2 WEEKS');
  $('.span-covered-text').html('S$50K');
  $('.div-age-pointer').css('left', '0px');
  $('.div-covered-pointer').css('left', '0px');
  ageDisableMask.css('display', 'block');
  coveredDisableMask.css('display', 'block');
};

$('.btn-view-four-clear').click(function() {
  clearGender();
  clearSmoker();
  clearAgeAndCovered();
  $(this).addClass('disable');
  $('.btn-view-four-next').addClass('disable');
});

$('.btn-view-four-next').click(function() {
  window.localStorage.setItem("gender", gender);
  window.localStorage.setItem("smoker", smoker);
  window.localStorage.setItem("age", age);
  window.localStorage.setItem("covered", covered);
  window.localStorage.setItem("ageValueAtWidth", ageValueAtWidth);
  window.localStorage.setItem("coveredValueAtWidth", coveredValueAtWidth);


});


//--- onReady ------------------------------------------------------------------

$(document).ready(function() {
  gender = window.localStorage.getItem('gender');
  if (gender == -1) {
    return;
  }

  if (gender == 0) {
    activeFamle();
  } else {
    activeMale();
  }

  smoker = window.localStorage.getItem('smoker');
  if (smoker == -1) {
    return;
  }

  if (smoker == 0) {
    activeNonSmoker();
  } else {
    activeSmoker();
  }

  age = window.localStorage.getItem('age');
  ageValueAtWidth = window.localStorage.getItem('ageValueAtWidth');
  if (age == -1) {
    return;
  } else {
    enableNextButtonCoveredScollbar();
    ageCalculater(null, ageValueAtWidth);
    $('.div-age-pointer').css('left', ageValueAtWidth + "px");
  }

  covered = window.localStorage.getItem('covered');
  coveredValueAtWidth = window.localStorage.getItem('coveredValueAtWidth');
  if (covered == -1) {
    return;
  } else {
    coveredCalculater(null, coveredValueAtWidth);
    $('.div-covered-pointer').css('left', coveredValueAtWidth + "px");
  }
});


//------------------------------------------------------------------------------
// View 5
//------------------------------------------------------------------------------

var vitalityErrorMessage = $('.div-membership-error-message');
var viewFiveSectionOne = $('.view-five-section-one');
var viewFiveSectionTwo = $('.view-five-section-two');

function initializeViewFive() {
  // Age
  $('.span-review-age').html(age);
  // Gender
  var genderText = "MALE";
  if (gender == 0) {
    genderText = "FAMALE";
  }
  $('.span-review-gender').html(genderText);
  // smoker
  var smokerText = "SMOKER";
  if (smoker == 0) {
    smokerText = "NON-SMOKER";
  }
  $('.span-review-smoker').html(smokerText);
  // sum assure
  $('.span-review-covered').html("S$" + Number(covered).toLocaleString('en'));

  //values
  $('.div-value-1').html(Number(covered).toLocaleString('en'));
  //$('.div-value-2').html(Number(covered).toLocaleString('en'));
  //$('.div-value-3').html(Number(covered).toLocaleString('en'));
  //$('.div-value-4').html(Number(covered).toLocaleString('en'));
  //$('.div-value-5').html(Number(covered).toLocaleString('en'));
  // lifes
  $('.div-life-1').html(Number(covered).toLocaleString('en'));
  //$('.div-life-2').html(Number(covered).toLocaleString('en'));
  //$('.div-life-3').html(Number(covered).toLocaleString('en'));
  //$('.div-life-4').html(Number(covered).toLocaleString('en'));
  //$('.div-life-5').html(Number(covered).toLocaleString('en'));
}

$('.btn-view-five-vitality').click(function() {
  if (age < 0) {
    vitalityErrorMessage.addClass('shake')
    .fadeIn(function() {
      setTimeout(function() {
        vitalityErrorMessage.removeClass('shake').fadeOut();
      }, 2000);
    });
  } else {
    viewFiveSectionOne.fadeOut(300);
    viewFiveSectionTwo.fadeIn(300);
  }
});

$('.btn-view-five-back').click(function() {
  viewFiveSectionOne.fadeIn(300);
  viewFiveSectionTwo.fadeOut(300);
});

$('.btn-view-five-next').click(function() {

});







