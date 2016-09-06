
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
var viewSixFooter = "<b>Note:</b> This is for illustration purpose only.";


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
  $('#footer').removeClass('footer-view-6');
  var previuos = previousPage.pop();
  //console.log(previousPage);

  switch(previuos) {
    case "view-1":
    ViewTwo.fadeOut(100);
    ViewThree.fadeOut(100);
    ViewOne.fadeIn();
    footer.html(viewOneFooter);
    break;
    case "view-2":
    ViewThree.fadeOut(100);
    ViewTwo.fadeIn();
    footer.html(viewTwoFooter);
    break;
    case "view-3":
    ViewFour.fadeOut(100);
    ViewThree.fadeIn();
    footer.html(viewThreeFooter);
    break;
    case "view-4":
    ViewFive.fadeOut(100);
    ViewFour.fadeIn();
    footer.html(viewFourFooter);
    break;
    case "view-5-section-1":
    ViewSix.fadeOut(100);
    ViewFive.fadeIn();
    viewFiveSectionTwo.fadeOut(100);
    viewFiveSectionOne.fadeIn();
    footer.html(viewFiveFooter);
    break;
    case "view-5-section-2":
    ViewSix.fadeOut(100);
    ViewFive.fadeIn();
    viewFiveSectionOne.fadeOut(100);
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
var maxPageWidth = 836;
var maxAge = 65;
var maxCovered = 45;
var startCovered = 50;
var endCovered = 500;
var smokeAble = 16;
var gender = -1;
var smoker = -1;
var age = -1;
var ageTwo = -1;
var ageThree = -1;
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
  age = -1;
  covered = -1;
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
  if (age == -1) {
    return;
  } else {
    enableNextButtonCoveredScollbar();
    ageCalculater(null, ageValueAtWidth);
    $('.div-age-pointer').css('left', ageValueAtWidth + "px");
  }

  covered = $.cookie('covered');
  coveredValueAtWidth = $.cookie('coveredValueAtWidth');
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
  //console.log(previousPage);
});

$('.btn-view-five-next-1').click(function() {
  $('#footer').addClass('footer-view-6');
  previousPage.push("view-5-section-1");
  footer.html(viewSixFooter);
  ViewFive.fadeOut(200);
  ViewSix.fadeIn();
  firstInitViewSix();
  firstAnimationView6();
});
$('.btn-view-five-next-2').click(function() {
  $('#footer').addClass('footer-view-6');
  previousPage.push("view-5-section-2");
  footer.html(viewSixFooter);
  ViewFive.fadeOut(200);
  ViewSix.fadeIn();
  firstInitViewSix();
  firstAnimationView6();
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
var isReviewTime = false;

var firstAnimationTime = 8000;
var secondAnimationTime = 8000;
var threeAnimationTime = 8000;

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
  var ageInterval = setInterval(function(){
    currentAge += 1;
    ageAnimation.html(currentAge);
  }, firstAnimationTime / (ageTwo - age));

  setTimeout(function() {
    // show popup
    popupFirst.fadeIn(300);
    // clear animtion
    clearInterval(ageInterval);
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
  var monthInterval = setInterval(function(){
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
  var ageInterval = setInterval(function(){
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
  resetView6();
});

function resetView6() {
  ageAnimation.html(age);
  secondYearOld.removeClass('active');
  threeYearOld.removeClass('active');
  fourYearOld.removeClass('active');
  rainningWrapper.removeClass('appear').removeClass('hidding');
  ageBarWapper.removeClass('first').removeClass('second').removeClass('three');
  powerSetMonth.html("12 MONTHS");
  firstInitViewSix();

  setTimeout(function() {
    firstAnimationView6();
  }, 300);
}


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










