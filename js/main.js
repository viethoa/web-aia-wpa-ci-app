function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

//------------------------------------------------------------------------------
// Non-Smoker
//------------------------------------------------------------------------------

var discount = [5, 0, -10, -20];
var MNSValuePlan = [7.04,7.21,7.38,7.56,7.74,7.93,8.22,8.52,8.83,9.15,9.47,9.68,9.9,10.12,10.35,10.59,10.88,11.26,11.65,12.05,12.47,12.89,13.32,13.77,14.23,14.7,15.13,15.58,16.04,16.51,17,17.52,18.06,18.61,19.18,19.76,20.43,21.13,21.85,22.59,23.36,24.3,25.28,26.3,27.36,28.46,30.06,31.75,33.53,35.41,37.4,39.93,42.63,45.52,48.6,51.9,55.58,59.53,63.76,68.29,73.13,79.18,85.73,92.82,100.5,108.82];
var FNSValuePlan = [6.38,6.52,6.66,6.8,6.95,7.09,7.3,7.52,7.75,7.98,8.22,8.43,8.65,8.87,9.1,9.34,9.57,9.8,10.04,10.28,10.53,10.84,11.16,11.49,11.83,12.18,12.5,12.83,13.17,13.52,13.87,14.24,14.62,15.01,15.41,15.82,16.28,16.76,17.25,17.75,18.27,19.42,20.65,21.95,23.34,24.82,25.65,26.51,27.4,28.32,29.27,30.99,32.8,34.72,36.75,38.89,41.63,44.56,47.7,51.06,54.67,59.38,64.5,70.06,76.1,82.67];
var MNSLifePlan = [8.72,8.97,9.23,9.49,9.76,10.04,10.35,10.67,11,11.34,11.7,12.1,12.52,12.95,13.4,13.87,14.32,14.78,15.26,15.75,16.26,16.91,17.59,18.3,19.04,19.8,20.47,21.17,21.89,22.63,23.4,24.21,25.05,25.92,26.82,27.75,28.86,30.02,31.23,32.48,33.79,35.06,36.38,37.75,39.17,40.66,42.94,45.35,47.9,50.59,53.43,57.05,60.91,65.03,69.43,74.14,79.41,85.05,91.09,97.56,104.48,113.12,122.48,132.61,143.58,155.46];
var FNSLifePlan = [8.42,8.65,8.88,9.12,9.36,9.61,9.89,10.18,10.48,10.79,11.11,11.47,11.84,12.23,12.63,13.04,13.42,13.83,14.25,14.68,15.12,15.69,16.28,16.89,17.53,18.19,18.76,19.35,19.96,20.59,21.24,21.93,22.64,23.37,24.13,24.9,25.87,26.88,27.93,29.02,30.17,31.16,32.18,33.23,34.32,35.45,36.64,37.87,39.14,40.46,41.82,44.26,46.85,49.59,52.49,55.56,59.47,63.66,68.15,72.95,78.1,84.83,92.15,100.1,108.73,118.11];

function annualPremiumCalculator(age, gender, sumAssured) {
  var valuePlan = MNSValuePlan[age];
  var lifePlan = MNSLifePlan[age];
  if (gender == 0) {
    valuePlan = FNSValuePlan[age];
    lifePlan = FNSLifePlan[age];
  }

  var annualPremiumValue = valuePlan * sumAssured;
  var annualPremiumLife = lifePlan * sumAssured;
  console.log(annualPremiumValue, annualPremiumLife);

  if (sumAssured < 100) {         // tang 5%
    annualPremiumValue = annualPremiumValue + ((annualPremiumValue / 100) * discount[0]);
    annualPremiumLife = annualPremiumLife + ((annualPremiumLife / 100) * discount[0]);
  } else if (sumAssured < 250) {  // tang 0%
    annualPremiumValue = annualPremiumValue + ((annualPremiumValue / 100) * discount[1]);
    annualPremiumLife = annualPremiumLife + ((annualPremiumLife / 100) * discount[1]);
  } else if (sumAssured < 350) {  // giam 10%
    annualPremiumValue = annualPremiumValue + ((annualPremiumValue / 100) * discount[2]);
    annualPremiumLife = annualPremiumLife + ((annualPremiumLife / 100) * discount[2]);
  } else if (sumAssured < 500) {  // giam 20%
    annualPremiumValue = annualPremiumValue + ((annualPremiumValue / 100) * discount[3]);
    annualPremiumLife = annualPremiumLife + ((annualPremiumLife / 100) * discount[3]);
  }

  annualPremiumValue = round(annualPremiumValue, 2);
  annualPremiumLife = round(annualPremiumLife, 2);
  console.log(annualPremiumValue, annualPremiumLife);
  $('.div-value-2').html(Number(annualPremiumValue).toLocaleString('en'));
  $('.div-life-2').html(Number(annualPremiumLife).toLocaleString('en'));
}


//------------------------------------------------------------------------------
// global values
//------------------------------------------------------------------------------

var ViewOne = $('.view-1');
var ViewTwo = $('.view-2');
var ViewThree = $('.view-3');
var ViewFour = $('.view-4');
var ViewFive = $('.view-5');
var ViewSix = $('.view-6');

var previousPage = [];


function navigation(currentView, nextView) {
  switch(currentView) {
    case 1:
    ViewOne.fadeOut(100);
    previousPage.push("view-1");
    break;
    case 2:
    ViewTwo.fadeOut(100);
    previousPage.push("view-2");
    break;
    case 3:
    ViewThree.fadeOut(100);
    previousPage.push("view-3");
    break;
    case 4:
    ViewFour.fadeOut(100);
    previousPage.push("view-4");
    break;
  }
  //console.log(previousPage);

  switch(nextView) {
    case 2:
    ViewTwo.fadeIn();
    break;
    case 3:
    ViewThree.fadeIn();
    break;
    case 4:
    ViewFour.fadeIn();
    break;
    case 5:
    ViewFive.fadeIn();
    break;
  }
}

$('.back-icon').click(function() {
  var previuos = previousPage.pop();
  //console.log(previousPage);

  switch(previuos) {
    case "view-1":
    ViewTwo.fadeOut(100);
    ViewThree.fadeOut(100);
    ViewOne.fadeIn();
    break;
    case "view-2":
    ViewThree.fadeOut(100);
    ViewTwo.fadeIn();
    break;
    case "view-3":
    ViewFour.fadeOut(100);
    ViewThree.fadeIn();
    break;
    case "view-4":
    ViewFive.fadeOut(100);
    ViewFour.fadeIn();
    break;
    case "view-5-section-1":
    resetDataView6();
    ViewSix.fadeOut(100);
    ViewFive.fadeIn();
    viewFiveSectionTwo.fadeOut(100);
    viewFiveSectionOne.fadeIn();
    break;
    case "view-5-section-2":
    resetDataView6();
    ViewSix.fadeOut(100);
    ViewFive.fadeIn();
    viewFiveSectionOne.fadeOut(100);
    viewFiveSectionTwo.fadeIn();
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
var maxPageWidth = 836;
var maxAge = 65;
var maxCovered = 45;
var startCovered = 50;
var endCovered = 500;
var smokeAble = 16;
var gender = -1;
var smoker = -1;
var age = 0;
var ageTwo = -1;
var ageThree = -1;
var ageValueAtWidth = -1;
var covered = 50;
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

  // Age two is new logic that minimum ageTwo is 40 years old.
  ageTwo = age + 5;
  if (ageTwo < 40) {
    ageTwo = 40;
  }

  // ageThree = ageTwo + 1.
  ageThree = ageTwo + 1;
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
  $.cookie("gender", gender);

  $('.img-male').removeClass('selected');
  $('.img-female').removeClass('selected');
};

function clearSmoker() {
  smoker = -1;
  $.cookie("smoker", smoker);

  $('.img-smoker').removeClass('selected');
  $('.img-non-smoker').removeClass('selected');
  smokerDisableMask.css('display', 'block');
};

function clearAgeAndCovered() {
  age = 0;
  covered = startCovered;
  $.cookie("age", age);
  $.cookie("covered", covered);
  $.cookie("ageValueAtWidth", -1);
  $.cookie("coveredValueAtWidth", -1);

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
  $.cookie("gender", gender);
  $.cookie("smoker", smoker);
  $.cookie("age", age);
  $.cookie("covered", covered);
  $.cookie("ageValueAtWidth", ageValueAtWidth);
  $.cookie("coveredValueAtWidth", coveredValueAtWidth);

  initializeViewFive();
  navigation(4, 5);
});


//--- onReady ------------------------------------------------------------------

$(document).ready(function() {
  gender = $.cookie('gender');
  if (gender == -1) {
    return;
  }

  if (gender == 0) {
    activeFamle();
  } else {
    activeMale();
  }

  smoker = $.cookie('smoker');
  if (smoker == -1) {
    return;
  }

  if (smoker == 0) {
    activeNonSmoker();
  } else {
    activeSmoker();
  }

  age = $.cookie('age');
  ageValueAtWidth = $.cookie('ageValueAtWidth');
  if (age == 0) {
    return;
  } else {
    enableNextButtonCoveredScollbar();
    ageCalculater(null, ageValueAtWidth);
    $('.div-age-pointer').css('left', ageValueAtWidth + "px");
  }

  covered = $.cookie('covered');
  coveredValueAtWidth = $.cookie('coveredValueAtWidth');
  if (covered == 0) {
    covered = startCovered;
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
  //$('.div-value-3').html(Number(covered).toLocaleString('en'));
  //$('.div-value-4').html(Number(covered).toLocaleString('en'));
  //$('.div-value-5').html(Number(covered).toLocaleString('en'));
  // lifes
  $('.div-life-1').html(Number(covered * 1000).toLocaleString('en'));
  //$('.div-life-3').html(Number(covered).toLocaleString('en'));
  //$('.div-life-4').html(Number(covered).toLocaleString('en'));
  //$('.div-life-5').html(Number(covered).toLocaleString('en'));
  annualPremiumCalculator(age, gender, covered);
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
    previousPage.push("view-5-section-1");
    console.log(previousPage);
  }
});

$('.btn-view-five-back').click(function() {
  viewFiveSectionOne.fadeIn();
  viewFiveSectionTwo.fadeOut(200);
  previousPage.pop();
  //console.log(previousPage);
});

$('.btn-view-five-next-1').click(function() {
  previousPage.push("view-5-section-1");
  ViewFive.fadeOut(200);
  ViewSix.fadeIn();
  resetDataView6();
  startAnimateView6();
});
$('.btn-view-five-next-2').click(function() {
  previousPage.push("view-5-section-2");
  ViewFive.fadeOut(200);
  ViewSix.fadeIn();
  resetDataView6();
  startAnimateView6();
});

//------------------------------------------------------------------------------
// View 6
//------------------------------------------------------------------------------

var parallaxBackground = $('#parallax-background');
var rainningWrapper = $('.rain-cloud-wrapper');
var ageAnimation = $('#span-year-old');
var ageBarWapper = $('#div-age-bar-wrapper');
var firstYearOld = $('.span-first-year-old');
var secondYearOld = $('.span-second-year-old');
var threeYearOld = $('.span-3rd-year-old');
var fourYearOld = $('.span-4th-year-old');
var walkWrapper = $('.walker-wrapper');
var walkPaper1 = $('#walker-background-1');
var walkPaper2 = $('#walker-background-2');
var walkPaper3 = $('#walker-background-3');
var walkPaper4 = $('#walker-background-4');
var popupFirst = $('.div-popup-first');
var popupSecond = $('.div-popup-second');
var popupThree = $('.div-popup-three');
var popupTapping = $('.tapping-wrapper');

var powerSetMonthMessage = $('.p-power-reset-message');
var powerSetMonth = $('#p-power-set-month');
var ageInterval;
var monthInterval;
var isReviewTime = false;

var firstAnimationTime = 8000;
var secondAnimationTime = 8000;
var threeAnimationTime = 8000;

function resetDataView6() {
  ageAnimation.html(age);
  secondYearOld.removeClass('active');
  threeYearOld.removeClass('active');
  fourYearOld.removeClass('active');
  rainningWrapper.removeClass('appear').removeClass('hidding');
  ageBarWapper.removeClass('first').removeClass('second').removeClass('three');
  powerSetMonth.html("12 MONTHS");

  popupFirst.hide();
  popupSecond.hide();
  popupThree.hide();
  popupTapping.hide();
  clearInterval(ageInterval);
  clearInterval(monthInterval);
}

function startAnimateView6() {
  firstInitViewSix();
  setTimeout(function() {
    firstAnimationView6();
  }, 300);
}

function firstInitViewSix() {
  firstYearOld.html(age);
  secondYearOld.html(ageTwo);
  threeYearOld.html(ageThree);
  if (gender == 0) {
    walkPaper1.addClass('female-walker-1');
    walkPaper2.addClass('female-walker-2');
    walkPaper3.addClass('female-walker-3');
    walkPaper4.addClass('female-walker-4');
  } else {
    walkPaper1.addClass('male-walker-1');
    walkPaper2.addClass('male-walker-2');
    walkPaper3.addClass('male-walker-3');
    walkPaper4.addClass('male-walker-4');
  }

  ageAnimation.html(age);
  $('#span-money').html("S$" + Number(covered * 1000).toLocaleString('en'));
}

function firstAnimationView6() {
  parallaxBackground.addClass('first');
  secondYearOld.addClass('active');
  walkWrapper.addClass('active');
  ageBarWapper.addClass('first');

  var currentAge = age;
  ageInterval = setInterval(function(){
    currentAge += 1;
    ageAnimation.html(currentAge);
  }, firstAnimationTime / (ageTwo - age));

  setTimeout(function() {
    // show popup
    popupFirst.fadeIn(300);
    // clear animtion
    clearInterval(ageInterval);
    ageAnimation.html(ageTwo);
    walkWrapper.removeClass('active');
    parallaxBackground.removeClass('first');
  }, firstAnimationTime);
}


//---Animation second after button close click-----------------------------------

$('.popup-first-close-button').click(function() {
  $(this).parent().fadeOut(300);

  secondInitView6();
  setTimeout(function() {
    $('#span-money').html("S$0");
    powerSetMonthMessage.fadeIn(300);
    $('.p-claimed-for-major').html('CLAIM AMOUNT');
    $('.p-stage-critical-illness').html('RECEIVED S$' + Number(covered * 1000).toLocaleString('en'));
  }, 2000);
  setTimeout(function() {
    $('.p-claimed-for-major').fadeOut(function() {
      $(this).html('CLAIMED FOR MAJOR');
    })
    $('.p-stage-critical-illness').fadeOut(function() {
      $(this).html('STAGE CRITICAL ILLNESS');
    });

    if (!isReviewTime) {
      secondAnimationView6();
    }
  }, 4000);
});

function secondInitView6() {
  rainningWrapper.addClass('appear');
  $('.p-claimed-for-major').fadeIn(300);
  $('.p-stage-critical-illness').fadeIn(300);

  if (gender == 0) {
    walkPaper1.removeClass('female-walker-1').addClass('female-walker-unhappy-1');
    walkPaper2.removeClass('female-walker-2').addClass('female-walker-unhappy-2');
    walkPaper3.removeClass('female-walker-3').addClass('female-walker-unhappy-3');
    walkPaper4.removeClass('female-walker-4').addClass('female-walker-unhappy-4');
  } else {
    walkPaper1.removeClass('male-walker-1').addClass('male-walker-unhappy-1');
    walkPaper2.removeClass('male-walker-2').addClass('male-walker-unhappy-2');
    walkPaper3.removeClass('male-walker-3').addClass('male-walker-unhappy-3');
    walkPaper4.removeClass('male-walker-4').addClass('male-walker-unhappy-4');
  }
}

function secondAnimationView6() {
  walkWrapper.addClass('active');
  ageBarWapper.addClass('second');
  threeYearOld.addClass('active');
  parallaxBackground.addClass('second');
  rainningWrapper.addClass('hidding');

  var month = 12;
  monthInterval = setInterval(function(){
    month -= 1;
    if (month == 1) {
      powerSetMonth.html(month + " MONTH");
    } else if (month > 1) {
      powerSetMonth.html(month + " MONTHS");
    }
  }, secondAnimationTime / 12);

  setTimeout(function() {
    walkWrapper.removeClass('active');
    clearInterval(monthInterval);

    popupSecond.fadeIn(300);
    ageAnimation.html(ageThree);
    parallaxBackground.removeClass('second');
    powerSetMonthMessage.fadeOut(300);
    $('#span-money').html("S$" + Number(covered * 1000).toLocaleString('en'));
    $('.span-covered-for-popup').html("S$" + Number(covered * 1000).toLocaleString('en'));

    threeInitView6();
  }, secondAnimationTime);
};

function threeInitView6() {
  if (gender == 0) {
    $('.div-person-for-popup').addClass('female');
    walkPaper1.removeClass('female-walker-unhappy-1').addClass('female-walker-1');
    walkPaper2.removeClass('female-walker-unhappy-2').addClass('female-walker-2');
    walkPaper3.removeClass('female-walker-unhappy-3').addClass('female-walker-3');
    walkPaper4.removeClass('female-walker-unhappy-4').addClass('female-walker-4');
  } else {
    $('.div-person-for-popup').addClass('male');
    walkPaper1.removeClass('male-walker-unhappy-1').addClass('male-walker-1');
    walkPaper2.removeClass('male-walker-unhappy-2').addClass('male-walker-2');
    walkPaper3.removeClass('male-walker-unhappy-3').addClass('male-walker-3');
    walkPaper4.removeClass('male-walker-unhappy-4').addClass('male-walker-4');
  }
}


//---Animation three after button close click-----------------------------------

$('.popup-second-close-button').click(function() {
  $(this).parent().fadeOut(300);
  if (!isReviewTime) {
    threeAnimationView6();
  }
});

function threeAnimationView6() {
  setTimeout(function() {
    fourYearOld.addClass('active');
    walkWrapper.addClass('active');
    ageBarWapper.addClass('three');
    parallaxBackground.addClass('three');
  }, 200);

  var currentAge = ageThree;
  ageInterval = setInterval(function(){
    currentAge += 1;
    if (currentAge <= 75) {
      ageAnimation.html(currentAge);
    }
  }, threeAnimationTime / (75 - ageThree));

  setTimeout(function() {
    parallaxBackground.removeClass('three');
    walkWrapper.removeClass('active');
    clearInterval(ageInterval);
    popupThree.fadeIn(300);
    ageAnimation.html(75);
  }, threeAnimationTime + 200);
}


//---Replay animation-----------------------------------------------------------

$('.popup-three-replay-button').click(function() {
  $(this).parent().fadeOut(300);
  isReviewTime = false;
  resetDataView6();
  startAnimateView6();
});


//---Review animation-----------------------------------------------------------

$('.popup-three-review-button').click(function() {
  $(this).parent().fadeOut(100);
  popupTapping.fadeIn(300);

  powerSetMonth.html("12 MONTHS");
  rainningWrapper.removeClass('appear').removeClass('hidding');
});

popupTapping.click(function() {
  $(this).fadeOut(300);
  isReviewTime = true;
});

$('#span-first-year-old').click(function() {
  if (!isReviewTime) {
    return;
  }

  ageAnimation.html(age);
  powerSetMonthMessage.fadeOut(300);
  rainningWrapper.removeClass('appear');
});

$('#span-second-year-old').click(function() {
  if (!isReviewTime) {
    return;
  }

  popupFirst.fadeIn(300);
  ageAnimation.html(ageTwo);
});

$('#span-3rd-year-old').click(function() {
  if (!isReviewTime) {
    return;
  }

  ageAnimation.html(ageThree);
  popupSecond.fadeIn(300);
  powerSetMonthMessage.fadeOut(300);
  rainningWrapper.removeClass('appear');
});

$('#span-4th-year-old').click(function() {
  if (!isReviewTime) {
    return;
  }

  ageAnimation.html(75);
  popupThree.fadeIn(300);
  powerSetMonthMessage.fadeOut(300);
  rainningWrapper.removeClass('appear');
});










