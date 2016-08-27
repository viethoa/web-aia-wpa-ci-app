
var ViewOne = $('.view-1');
var ViewTwo = $('.view-2');
var ViewThree = $('.view-3');
var ViewFour = $('.view-4');
var ViewFive = $('.view-5');
var ViewSix = $('.view-6');
var footer = $('.p-footer-content');

var previousPage = [];

var viewOneFooter = "<b>Note:</b> This is for illustration purpose only.";
var viewTwoFooter = "Source: 1. AIA Health Matters Survey 2016 <br/> <b>Note:</b> This is for illustration purpose only.";
var viewThreeFooter = "<b>Note:</b> This is for illustration purpose only.";
var viewFourFooter = "<b>Note:</b> This is for illustration purpose only. For more details and illustration of higher sum assured amount, you should refer to the Benefit Illustration, which can be obtained from your AIA Financial Services Consultant.";
var viewFiveFooter = "1.  For Life plan, a Maturity Benefit of 100% of your sum assured amount (less any critical illness claims paid) will be payable if you wish to hold your policy until maturity (age 100). <br/> 2.  The surrender value illustrated is based on the assumption that no critical illness claim is paid. <br/> <b>Note:</b> This is for illustration purpose only. Premiums illustrated are non-guaranteed. For more details, you should refer to the Benefit Illustration, which can be obtained from your AIA Financial Services Consultant.";
var viewFiveSectionTwoFooter = "1  Premium discount is based on standard life and will not be applicable on any extra premiums due to loading.  2  The additional 5% special discount is only applicable in the first policy year and is subject to promotion period. Each member starts off with Bronze Vitality Status.  3  Based on the assumption that members remain on the Platinum Vitality status from second policy year to age 75. The maximum premium discount figures illustrated are rounded down to the nearest S$100. <br/> <b>Note:</b> This is for illustration purpose only.";


function navigation(currentView, nextView) {
  switch(currentView) {
    case 1:
      ViewOne.fadeOut(200);
      previousPage.push("view-1");
      break;
    case 2:
      ViewTwo.fadeOut(200);
      previousPage.push("view-2");
      break;
    case 3:
      ViewThree.fadeOut(200);
      previousPage.push("view-3");
      break;
    case 4:
      ViewFour.fadeOut(200);
      previousPage.push("view-4");
      break;
  }
  //console.log(previousPage);

  switch(nextView) {
    case 2:
      ViewTwo.fadeIn();
      footer.html(viewTwoFooter);
      break;
    case 3:
      ViewThree.fadeIn();
      footer.html(viewThreeFooter);
      break;
    case 4:
      ViewFour.fadeIn();
      footer.html(viewFourFooter);
      break;
    case 5:
      ViewFive.fadeIn();
      footer.html(viewFiveFooter);
      break;
  }
}

$('.back-icon').click(function() {
  var previuos = previousPage.pop();
  //console.log(previousPage);

  switch(previuos) {
    case "view-1":
      ViewTwo.fadeOut(200);
      ViewThree.fadeOut(200);
      ViewOne.fadeIn();
      footer.html(viewOneFooter);
      break;
    case "view-2":
      ViewThree.fadeOut(200);
      ViewTwo.fadeIn();
      footer.html(viewTwoFooter);
      break;
    case "view-3":
      ViewFour.fadeOut(200);
      ViewThree.fadeIn();
      footer.html(viewThreeFooter);
      break;
    case "view-4":
      ViewFive.fadeOut(200);
      ViewFour.fadeIn();
      footer.html(viewFourFooter);
      break;
    case "view-5-section-1":
      ViewSix.fadeOut(200);
      ViewFive.fadeIn();
      viewFiveSectionTwo.fadeOut(200);
      viewFiveSectionOne.fadeIn();
      footer.html(viewFiveFooter);
      break;
    case "view-5-section-2":
      ViewSix.fadeOut(200);
      ViewFive.fadeIn();
      viewFiveSectionOne.fadeOut(200);
      viewFiveSectionTwo.fadeIn();
      footer.html(viewFiveSectionTwoFooter);
      break;
  }
});

//------------------------------------------------------------------------------
// View 1
//------------------------------------------------------------------------------

$('.view-one-btn-yes').click(function() {
  $(this).parent().children().removeClass('active');
  $(this).next().addClass('active');
});

$('.view-one-btn-no').click(function() {
  $(this).parent().children().removeClass('active')
  .first().addClass('active');
});

$('#btn-view-one-next').click(function() {
  var btnYesHaveActive = $('.ul-option-container').find('.li-md').children('.view-one-btn-yes.active');
  //console.log(btnYesHaveActive);

  if (btnYesHaveActive.length > 0) {
    navigation(1, 3);
  } else {
    navigation(1, 2);
  }
});


//------------------------------------------------------------------------------
// View 2
//------------------------------------------------------------------------------

$('#btn-view-two-next').click(function() {
  navigation(2, 3);
});


//------------------------------------------------------------------------------
// View 3
//------------------------------------------------------------------------------

$('#btn-view-three-next').click(function() {
  navigation(3, 4);
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
      smokeErrorMessage.removeClass('shake').fadeOut(200);
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

  initializeViewFive();
  navigation(4, 5);
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
var minVitalityPremium = 18;

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
  $('.span-review-covered').html("S$" + Number(covered * 1000).toLocaleString('en'));

  //values
  $('.div-value-1').html(Number(covered * 1000).toLocaleString('en'));
  //$('.div-value-2').html(Number(covered).toLocaleString('en'));
  //$('.div-value-3').html(Number(covered).toLocaleString('en'));
  //$('.div-value-4').html(Number(covered).toLocaleString('en'));
  //$('.div-value-5').html(Number(covered).toLocaleString('en'));
  // lifes
  $('.div-life-1').html(Number(covered * 1000).toLocaleString('en'));
  //$('.div-life-2').html(Number(covered).toLocaleString('en'));
  //$('.div-life-3').html(Number(covered).toLocaleString('en'));
  //$('.div-life-4').html(Number(covered).toLocaleString('en'));
  //$('.div-life-5').html(Number(covered).toLocaleString('en'));
}

$('.btn-view-five-vitality').click(function() {
  if (age < minVitalityPremium) {
    vitalityErrorMessage.addClass('shake')
    .fadeIn(function() {
      setTimeout(function() {
        vitalityErrorMessage.removeClass('shake').fadeOut(200);
      }, 2000);
    });
  } else {
    viewFiveSectionOne.fadeOut(200);
    viewFiveSectionTwo.fadeIn();
    footer.html(viewFiveSectionTwoFooter);
    previousPage.push("view-5-section-1");
    console.log(previousPage);
  }
});

$('.btn-view-five-back').click(function() {
  viewFiveSectionOne.fadeIn();
  viewFiveSectionTwo.fadeOut(200);
  footer.html(viewFiveFooter);
  previousPage.pop();
  console.log(previousPage);
});

$('.btn-view-five-next-1').click(function() {
  previousPage.push("view-5-section-1");
  ViewFive.fadeOut(200);
  ViewSix.fadeIn();
});
$('.btn-view-five-next-2').click(function() {
  previousPage.push("view-5-section-2");
  ViewFive.fadeOut(200);
  ViewSix.fadeIn();
});







