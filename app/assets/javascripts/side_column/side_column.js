$(function(){
  { // hide tables when side_col item clicked
    $(".list-group-item").each(function()
    {
      $(this).click(function(){
        if($(this).hasClass("active"))
        {
          $(this).removeClass("active");                                 // deselect the side_col item
          table_id = "#" + this.text.match(/\W*(\w+)/)[1].toLowerCase() + "_table"   // hide cooresponding table
          $(table_id).addClass("hide")
        }
        else
        {
          $(this).addClass("active");                                   // hide cooresponding table
          table_id = "#" + this.text.match(/\W*(\w+)/)[1].toLowerCase() + "_table"
          $(table_id).removeClass("hide")
        }
      });
    });
  }
});
