import { Component } from '@angular/core';
import { NgModule, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})




export class AppComponent {

  dataUrls = [];
  imaginateBtnTextReady = "Imaginate";
  imaginateBtnTextLoading = "Imaginating...";

  imaginateBtnText = this.imaginateBtnTextReady;
  allowImagination = false;

  numberOfWord = -1;
  textFragmentNumber = 0;

  fakeImageHeight = 450;
  imageWidth = 4096;
  imageHeight = 2304;
  lineHeight = 250;
  marginLeft = 100;
  marginTop = 350;
  format = "16:9";
  availableFormats=["16:9","4:3"];
  textSize = 200;
  font = "Arial";
  availableFonts=["Arial","Helvetica"];
  imageFormat = "jpeg";
  availableImageFormats=["png","jpeg"];
  sampleText = "Aenean varius vel elit ut lacinia. Vivamus id nibh laoreet, aliquam massa a, hendrerit orci."+
  " Cras nisl tortor, scelerisque in sodales non, scelerisque vitae dolor. Nam ac eros sed elit facilisis elementum"+
  " id eget erat. Ut luctus in dolor eu tempor. Ut tincidunt nisi dolor, eu interdum diam tincidunt a."+
  " Quisque vitae tempus nibh, tempor convallis augue. Cras massa neque, placerat id rhoncus eget, tristique quis tortor."+
  " Donec et nisl vestibulum lorem finibus interdum vitae eget nisl. Pellentesque ultrices vestibulum erat,"+
  " id tincidunt lectus tempor non. Ut id pharetra ante. Cras gravida cursus mauris vel fermentum."+
  " Nulla feugiat quam sit amet mi euismod dapibus. Pellentesque vestibulum mi bibendum dui venenatis,"+
  " a semper nibh faucibus. Nam euismod ut est sed placerat. Fusce vel elit eget sem vulputate ultricies commodo eleifend sem.";

  AlignFooter(){
      var mainBlock = <HTMLElement>document.getElementById('footer').getElementsByClassName('main-block')[0];
      console.log(mainBlock.clientHeight);
      if(document.documentElement.scrollHeight > document.documentElement.clientHeight){
          console.log((<HTMLElement>document.getElementById('footer')
          .getElementsByClassName('main-block')[0]).style.bottom=
          (document.documentElement.clientHeight - document.documentElement.scrollHeight - mainBlock.clientHeight - 100) + "px");
      }
  }

  AlignImageCharsContainersWrapper(){
      var wrapper = <HTMLElement>document.getElementsByClassName('imageCharsContainersWrapper')[0];
      var container = <HTMLElement>wrapper.parentElement;

      console.log(container.clientWidth);
      if(container.clientWidth < 990){
          wrapper.style.width="100%";
      }
  }

  wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight, maxHeight)
    {
        var words = text.split(" ");
        var countWords = words.length;
        var line = "";
        console.log(this.numberOfWord);
        for (var n = this.numberOfWord + 1; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width;
            if (testWidth + marginLeft > maxWidth) {
                context.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
                if (marginTop + lineHeight > maxHeight){
                  return 1;
                }
            }
            else {
                line = testLine;
            }
            this.numberOfWord++;
        }
        context.fillText(line, marginLeft, marginTop);
        return 0;
    }



  ngOnInit(){
    this.AlignFooter();
    this.AlignImageCharsContainersWrapper();
    this.updateSample();
  }

  constructor(){
    setTimeout(() => {
      this.allowImagination = true;
      //this.AlignFooter();
    }, 2000);
    //this.AlignFooter();
  }

  StartImaginatingForImaginateButton(){
    console.log("StartImaginatingForImaginateButton");
    this.imaginateBtnText = this.imaginateBtnTextLoading;
    this.allowImagination = false;
  }

  StopImaginatingForImaginateButton(){
    console.log("StopImaginatingForImaginateButton");
    this.imaginateBtnText = this.imaginateBtnTextReady;
    this.allowImagination = true;
  }

  updateImageSize(){
    var canvas = <HTMLCanvasElement>document.getElementById("image");
    canvas.setAttribute("width",this.imageWidth+"px");
    canvas.setAttribute("height",this.imageHeight+"px");
  }

  updateSampleSize(){
    var canvas = <HTMLCanvasElement>document.getElementById("sample");
    canvas.setAttribute("height",this.fakeImageHeight+"px");
  }

  onImaginate( text : string ){
    this.updateImageSize();
    console.log(this.format);

    this.StartImaginatingForImaginateButton();
    var canvas = <HTMLCanvasElement>document.getElementById("image");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "100px Arial";
    //ctx.fillText(text,10,100);

    //var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var maxWidth = this.imageWidth; //размер поле, где выводится текст
    var maxHeight = this.imageHeight;
    var lineHeight = this.lineHeight;
    /*если мы знаем высоту текста, то мы можем
     предположить, что высота строки должна быть именно такой*/
    var marginLeft = this.marginLeft;
    var marginTop = this.marginTop;
    /*var text = "Сначала мы разбиваем текст на слова по пробелам, а потом обходим эти слова в цикле, " +
            "объединяя их по одному в строку. Если при последнем объединении ширина этой строки меньше максимальной, " +
            "то продолжаем, а если больше, то выводим строку без последнего слова, а его записываем в новую строку." +
            "И так продолжаем, пока не а б в г д е е д ж е.";*/
    context.font = this.textSize+"px "+this.font;
    context.fillStyle = "#000";
    var result = 0;
    this.startDownloading(canvas, ctx, text, marginLeft, marginTop, maxWidth, lineHeight, maxHeight);
    /*do{
      this.textFragmentNumber++;
      //
      var grd = ctx.createLinearGradient(Math.round(Math.random()*this.imageWidth), Math.round(Math.random()*this.imageWidth), Math.round(Math.random()*this.imageWidth), Math.round(Math.random()*this.imageWidth));
      grd.addColorStop(0, "rgb("+Math.round(Math.random()*100)+","+
      Math.round(Math.random()*100)+","+Math.round(Math.random()*100)+")");
      grd.addColorStop(1, "rgb("+Math.round(Math.random()*100)+","+
      Math.round(Math.random()*100)+","+Math.round(Math.random()*100)+")");

      ctx.fillStyle = grd
      ctx.fillRect(0,0,canvas.width, canvas.height);
      //
      ctx.fillStyle = "rgb(255,255,255)";
      result = this.wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight, maxHeight);
      this.dataUrls[this.textFragmentNumber] = canvas.toDataURL("image/"+this.imageFormat);

      //var link = <HTMLElement>document.createElement('a');
      //link.setAttribute("download","textFragment"+this.textFragmentNumber);
      //link.setAttribute("href",canvas.toDataURL("image/"+this.imageFormat));
      //link.click();


      //ctx.clearRect(0, 0, canvas.width, canvas.height);

    } while(result != 0);*/
    //this.numberOfWord = -1;
    //this.textFragmentNumber = 1;
    //console.log(this.dataUrls);

    //this.StopImaginatingForImaginateButton();
  }

  startDownloading(canvas, ctx, text, marginLeft, marginTop, maxWidth, lineHeight, maxHeight){
    console.log("downloading");
    var context = ctx;

    this.textFragmentNumber++;
    //
    //var grd = ctx.createLinearGradient(Math.round(Math.random()*this.imageWidth), Math.round(Math.random()*this.imageWidth), Math.round(Math.random()*this.imageWidth), Math.round(Math.random()*this.imageWidth));
    //grd.addColorStop(0, "rgb("+Math.round(Math.random()*100)+","+
    //Math.round(Math.random()*100)+","+Math.round(Math.random()*100)+")");
    //grd.addColorStop(1, "rgb("+Math.round(Math.random()*100)+","+
    //Math.round(Math.random()*100)+","+Math.round(Math.random()*100)+")");

    ctx.fillStyle = "rgb(0,0,0)";

    ctx.fillRect(0,0,canvas.width, canvas.height);
    //
    ctx.fillStyle = "rgb(255,255,255)";
    var result = this.wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight, maxHeight);
    this.dataUrls[this.textFragmentNumber] = canvas.toDataURL("image/"+this.imageFormat);

    var link = <HTMLElement>document.createElement('a');
    link.setAttribute("download","textFragment"+this.textFragmentNumber);
    link.setAttribute("href",canvas.toDataURL("image/"+this.imageFormat));
    link.click();


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result != 0) {
      setTimeout(() => {
        this.startDownloading(canvas, ctx, text, marginLeft, marginTop, maxWidth, lineHeight, maxHeight);
      },1000);
    } else {
      this.numberOfWord = -1;
      this.textFragmentNumber = 0;
      setTimeout(() => {
        this.StopImaginatingForImaginateButton();
      },1000);
    }
  }

  onImageSizeChange( event : Event){
    var target = (<HTMLInputElement>event.target);
    target.value = this.correctValue(parseInt(target.value),parseInt(target.getAttribute("max")),parseInt(target.getAttribute("min")));
    if (this.format == "16:9"){
      this.imageHeight = Math.round(this.imageWidth * 9/16);
      this.fakeImageHeight = 450;
    } else {
      this.imageHeight = Math.round(this.imageWidth * 3/4);
      this.fakeImageHeight = 600;
    }
    this.updateSample();
  }

  onTextShapeChange( event : Event){
    var target = (<HTMLInputElement>event.target);
    console.log("correct value = "+this.correctValue(target.value,target.getAttribute("max"),target.getAttribute("min")));
    target.value = this.correctValue(parseInt(target.value),parseInt(target.getAttribute("max")),parseInt(target.getAttribute("min")));
    this.updateSample();
  }

  correctValue(value, max, min){
    console.log(value+" ; "+min+" ; "+max);
    console.log("value < min = "+(value < min));
    if (value < min) return min;
    console.log("value > max = "+(value > min));
    console.log(value+" > "+max+" = "+(value > max));
    if (value > max) return max;
    return value;
  }

  updateSample(){
    this.updateSampleSize();
    var canvas = <HTMLCanvasElement>document.getElementById("sample");
    var koeff = 800/this.imageWidth;
    var context = canvas.getContext("2d");
    var ctx = canvas.getContext("2d");
    var maxWidth = 800;
    var maxHeight = this.fakeImageHeight;
    var lineHeight = this.lineHeight*koeff;
    var marginLeft = this.marginLeft*koeff;
    var marginTop = this.marginTop*koeff;
    context.font = this.textSize*koeff+"px "+this.font;
    context.fillStyle = "#000";
    var result = 0;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0,0,0)";
    this.wrapText(context, this.sampleText, marginLeft, marginTop, maxWidth, lineHeight, maxHeight);
    this.numberOfWord = -1;
  }
}
