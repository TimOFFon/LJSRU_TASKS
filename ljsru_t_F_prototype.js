/*
==========================================================
==========================================================
         Задачи LJSRU / параграф F.prototype
==========================================================
==========================================================
*/

/* Изменяем "prototype" --------------------------------

      В коде ниже мы создаём нового кролика new Rabbit, 
      а потом пытаемся изменить его прототип.

------------  Сначала у нас есть такой код:---------------
*/
{
  function Rabbit() {}
  Rabbit.prototype = {
    eats: true,
  };

  let rabbit = new Rabbit();

  //   console.log(rabbit.eats); // true
}

/*-------------------------- 1 --------------------------
     Добавим одну строчку (выделенную в коде ниже). 
     Что вызов alert покажет нам сейчас?
*/
{
  function Rabbit() {}
  Rabbit.prototype = {
    eats: true,
  };

  let rabbit = new Rabbit();

  Rabbit.prototype = {};

  //   console.log(rabbit.eats); // ?
  // Ответ (true) Потому что позже изменение
}

/*--------------------------- 2 -------------------------
     …А если код такой (заменили одну строчку)?
*/
{
  function Rabbit() {}
  Rabbit.prototype = {
    eats: true,
  };

  let rabbit = new Rabbit();

  Rabbit.prototype.eats = false;

  // console.log( rabbit.eats ); // ?
  // false, обращаемся к prototype и переписываем сосрс
}

/*-------------------------  3  --------------------------
          Или такой (заменили одну строчку)?
 */
{
  function Rabbit() {}
  Rabbit.prototype = {
    eats: true,
  };

  let rabbit = new Rabbit();

  delete rabbit.eats;

  //   console.log(rabbit.eats); // ?
  // true, он возмёт ключ у prototype
}

/*------------------------- 4 --------------------------
    Или, наконец, такой:
*/
{
  function Rabbit() {}
  Rabbit.prototype = {
    eats: true,
  };

  let rabbit = new Rabbit();

  delete Rabbit.prototype.eats;

//   console.log(rabbit.eats); // ?
  // undefined, удалили св/во в сорсе
}




//=====================================================
//=====================================================
//      Создайте новый объект с помощью уже 
//                  существующего
//=====================================================
//=====================================================
/*
    Представьте, что у нас имеется некий объект obj, 
    созданный функцией-конструктором – 
    мы не знаем какой именно, 

    но хотелось бы создать ещё один объект 
    такого же типа.

    Можем ли мы сделать так?
*/
{
    // let obj2 = new obj.constructor();
    // console.log(obj); // obj is not defined
}//----------------------------------------------------

/* 
    Приведите пример функции-конструктора для 
    объекта obj, 
    с которой такой вызов корректно сработает. 
    
    И пример функции-конструктора, 
    с которой такой код поведёт себя неправильно.
*/
{// ------------------ РАБОТАЕТ -----------------------
    function Obj(value) {
        this.value = value;
    }

    let obj = new Obj('666');
    let obj2 = new obj.constructor('777');

    // console.log(obj2); // Obj {value: '777'}
    // console.log(Obj.prototype.constructor === Obj);// true
}

{//------------------ НЕ РАБОТАЕТ ----------------------
    function Obj(value) {
        this.value = value;
    }

    Obj.prototype = {}; // (*) ⫷ ⫷ ⫷ ⫷ ⫷ ⫷ ⫷ ⫷ ⫷

    let obj = new Obj('666');
    let obj2 = new obj.constructor('777');

    // console.log(obj);//{value: '666'} [[prototype]]:Object
    // console.log(obj.__proto__); // {}

    // console.log(obj2);//String {'777'} [[prototype]]:String
    // console.log(obj2.value);// undefined

    // console.log(Obj.prototype.constructor === Obj);//false
}

