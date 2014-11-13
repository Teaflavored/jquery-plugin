$.Tabs = function (el) { 
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeLink = this.$el.find(".active");
  this.$el.on('click', 'a', this.clickTab.bind(this) );
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(event){
  event.preventDefault();
  var $currentTarget = $(event.currentTarget); //new link
  
  var $oldTab = this.$contentTabs.find(this.$activeLink.attr("href"));
  var $newTab = this.$contentTabs.find($currentTarget.attr("href"));
  
  $oldTab.addClass("transitioning")
  
  $oldTab.one('transitionend', function(){
    $oldTab.removeClass("transitioning active");
    $newTab.addClass('active transitioning');
    window.setTimeout(function(){
      $newTab.removeClass("transitioning");
    },0)
  });
  
  
  
  this.$activeLink.removeClass('active'); // old link
  $currentTarget.addClass('active');
  
  this.$activeLink = $currentTarget;

};

//
// <div id="content-tabs">
//   <div class="tab-pane active" id="pembroke">