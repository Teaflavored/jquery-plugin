$.Tabs = function (el) { 
  this.$el = $(el);
  this.$contentTab = $(this.$el.data("content-tabs"))
  this.$activeTab = this.$contentTab.find(".active");
  this.$activeLink = this.$el.find(".active")
  this.$el.on('click', 'a', this.clickTab.bind(this) );
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(event){
  event.preventDefault();
  this.$activeTab.removeClass('active');
  this.$activeLink.removeClass('active');
  
  var $currentTarget = $(event.currentTarget);
  $currentTarget.addClass('active');
  
  this.$activeTab = $($currentTarget.attr("href"))
  this.$activeTab.addClass('active');
  this.$activeLink = $currentTarget;

};

//
// <div id="content-tabs">
//   <div class="tab-pane active" id="pembroke">