//自定义的时间区间
window.customizedDate1 = new Date() ;
window.customizedDate2 = new Date() ;
window.customizedMonthGap = 0 ;
window.customizedDayGap = 0 ;

resetCustomizedDates() ;

//请求数据时用到的时间区间参数
window.dataDate1 = myCloneDate(window.customizedDate1) ;
window.dataDate2 = myCloneDate(window.customizedDate2) ;

window.dateIndex = 0 ;

function calculateCustomizedDateGap(){
  var mill1 = window.customizedDate1.getTime() ;
  var mill2 = window.customizedDate2.getTime() ;
  if(mill1 >= mill2){
    window.customizedDayGap = 0 ;
  }else{
    window.customizedDayGap = (mill2 - mill1) / (1000 * 60 * 60 * 24) ;
  }
}

//将时间区间设置为默认值
function resetCustomizedDates(){
  window.customizedDate1 = new Date() ;
  window.customizedDate2 = new Date() ;

  //起始日期默认是本月第一天
  window.customizedDate1.setDate(1) ;

  //结束日期默认是本月最后一天
  window.customizedDate2.setDate(1) ;
  window.customizedDate2.setMonth(window.customizedDate2.getMonth() + 1) ;
  window.customizedDate2.setDate(window.customizedDate2.getDate() - 1) ;

  calculateCustomizedDateGap() ;
}


window.changeDateByIndex = function(){
  if(window.customizedDate1.getDate()==1 && 
    (isLastDayOfMonth(window.customizedDate2) || window.customizedDate2.getDate()==1)) {
    //如果起始日期是第一天，结束日期是第一天或者是最后一天，则每次的步进单位是月
    var monthGap = (window.customizedDate2.getYear() - window.customizedDate1.getYear()) 
      *12 + (window.customizedDate2.getMonth() - window.customizedDate1.getMonth()) ;
    if(window.customizedDate2.getDate() != 1){
      monthGap += 1 ;
    }
    monthGap *= window.dateIndex ;

    var tdate1 = addMonth(window.customizedDate1, monthGap) ;
    var tdate2 = addMonth(window.customizedDate2, monthGap) ;

    window.dataDate1.setTime(tdate1.getTime()) ;
    window.dataDate2.setTime(tdate2.getTime()) ;

  }else{
    var gap = (window.customizedDate2.getTime() - window.customizedDate1.getTime()) *window.dateIndex ;
    window.dataDate1.setTime( window.customizedDate1.getTime() + gap) ;
    window.dataDate2.setTime( window.customizedDate2.getTime() + gap) ;
  }
};

//重置计算参数
window.resetParams = function(){
  window.dateIndex = 0 ;
  window.dataDate1 = myCloneDate(window.customizedDate1) ;
  window.dataDate2 = myCloneDate(window.customizedDate2) ;
}

function myCloneDate(date){
  var tmpDate = new Date() ;
  tmpDate.setTime(date.getTime()) ;
  return tmpDate ;
}

function isLastDayOfMonth(date){
  var year = date.getFullYear() ;
  var month = date.getMonth() ;
  var day = date.getDate() ;
  var days = [] ;
  if(year % 4 == 0 && year % 100 != 0)
    days = [31,29,31,30,31,30,31,31,30,31,30,31] ;
  else
    days = [31,28,31,30,31,30,31,31,30,31,30,31] ;
  return day == days[month] ;
}

//JS Date类型内置的setMonth方法会影响天数，所以自己实现一个不影响天数的
//默认传入的date对应的天数是一个月中的第一天或者最后一天
function addMonth(sourceDate, months){
  var date = myCloneDate(sourceDate) ;
  var year = date.getFullYear() ;
  var month = date.getMonth() ;
  var day = date.getDate() ;
  var days = [] ;
  if(year % 4 == 0 && year % 100 != 0)
    days = [31,29,31,30,31,30,31,31,30,31,30,31] ;
  else
    days = [31,28,31,30,31,30,31,31,30,31,30,31] ;
  
  date.setFullYear(year + (months+month)/12) ;
  date.setDate(1) ;
  date.setMonth((months+month)%12) ;
  if(day == 1)
    date.setDate(1) ;
  else
    date.setDate(days[date.getMonth()]) ;
  return date ;
}