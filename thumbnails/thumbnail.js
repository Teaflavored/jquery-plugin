$.Thumbnails = function(el){
  this.$el = $(el);
  this.$bigPicDiv = this.$el.find(".active");
  this.$allGutterImg = this.$el.find(".gutter-images > img");
  this.$gutter = this.$el.find(".gutter-images");
  this.$navLinks = this.$el.find("div.gutter a")
  this.gutterIdx = 0;
  this.$activeImg = this.$allGutterImg.eq(0);
  this.activate(this.$activeImg);
  this.addGutterClick();
  this.mouseoverListener();
  this.fillGutterImages();
  this.navClick();
}
$.Thumbnails.prototype.navClick = function(){
  var that = this;
  this.$navLinks.on("click", function(event){
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    
    if ($currentTarget.hasClass("left")){
      that.gutterIdx--;
    } else {
      that.gutterIdx++;
    }
    
    if (that.gutterIdx < 0){
      that.gutterIdx = 0
    } else if (that.gutterIdx === that.$allGutterImg.length -5){
      that.gutterIdx = that.$allGutterImg.length - 6;
    }
    that.fillGutterImages();
  })
}
$.Thumbnails.prototype.addGutterClick = function(){
  var that = this;
  this.$gutter.on("click", "img", function(event){
    var $currentTarget = $(event.currentTarget);
    that.$activeImg = $currentTarget;
    that.activate($currentTarget);
  });
}

$.Thumbnails.prototype.fillGutterImages = function(){
  this.$gutter.html("")
  for(var i = this.gutterIdx; i < this.gutterIdx + 5; i++){
    this.$gutter.append(this.$allGutterImg.eq(i));
  }
}

$.Thumbnails.prototype.mouseoverListener = function(){
  var that = this;
  this.$gutter.on("mouseenter", "img", function(event){
    var $currentTarget = $(event.currentTarget);
    that.activate($currentTarget);
  });
  
  this.$gutter.on("mouseleave", "img", function(){
    that.activate(that.$activeImg);
  });
}




$.fn.thumbnail = function(){
  return this.each(function(){
    new $.Thumbnails(this)
  })
}

$.Thumbnails.prototype.activate = function($img){
  this.$bigPicDiv.html($img.clone())
}

