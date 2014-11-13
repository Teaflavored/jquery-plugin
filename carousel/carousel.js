$.Carousel = function(el){
  //el is carousel div
  this.$el = $(el);
  this.$allImages = $('div.items > *');
  this.activeIdx = 0;
  this.imageCount = this.$allImages.length;
  this.transitioningCurrently = false;
  
  this.$allImages.eq(0).addClass("active");
  
  
  this.$left  = this.$el.find(".slide-left");
  
  this.$right  = this.$el.find(".slide-right");
  var that = this;
  this.$left.on("click", function(event){
    event.preventDefault();
    that.slide(-1);
  });
  
  this.$right.on("click", function(event){
    event.preventDefault();
    that.slide(1);
  });
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};


$.Carousel.prototype.slide = function (dir){
  //will take in -1 or 1)
  if (this.transitioningCurrently){
    return;
  }
  this.transitioningCurrently = true;
  
  var $imageToMoveOut = this.$allImages.eq(this.activeIdx)
  
  
  if (dir === 1){
    $imageToMoveOut.addClass("left")
  } else {
    $imageToMoveOut.addClass("right")
  }
  var that = this;
  $imageToMoveOut.one("transitionend", function(){
    $imageToMoveOut.removeClass("left right active")
    that.transitioningCurrently = false;
  });  
  
  this.activeIdx += dir;
  if (this.activeIdx < 0){
    this.activeIdx = this.imageCount - 1;    
  } else if (this.activeIdx >= this.imageCount){
    this.activeIdx = 0;
  }
  
  var $imageToMoveIn = this.$allImages.eq(this.activeIdx) 
  
  if (dir === 1){
    $imageToMoveIn.addClass("active right")
  } else {
    $imageToMoveIn.addClass("active left")
  }
    window.setTimeout(function(){
      $imageToMoveIn.removeClass("left right")
    },0)

    
}

