//==================================================
//==================================================
//       Задачи из LearnJS Глава Прототипы
//==================================================
//==================================================



/* Работа с прототипами ____________________________
В приведённом ниже коде создаются и изменяются 
два объекта.
Какие значения показываются в процессе 
выполнения кода?
 _________________________________________________*/
 {
    let animal = {
        jumps: null
      };
      let rabbit = {
        __proto__: animal,
        jumps: true
      };
      
    //   // true
    //   console.log( rabbit.jumps ); // ? (1)
      
    //   delete rabbit.jumps;
      
    //   // null
    //   console.log( rabbit.jumps ); // ? (2)
      
    //   delete animal.jumps;
      
    //   // undefined
    //   console.log( rabbit.jumps ); // ? (3)
 }


 {/* Алгоритм поиска _____________________________________
Задача состоит из двух частей.

У нас есть объекты: */

let head = {
    glasses: 1
  };
  
  let table = {
    pen: 3
  };
  
  let bed = {
    sheet: 1,
    pillow: 2
  };
  
  let pockets = {
    money: 2000
  };

/*С помощью свойства __proto__ задайте прототипы так, 
чтобы поиск любого свойства выполнялся 
по следующему пути: pockets → bed → table → head. 
Например, pockets.pen должно возвращать 
значение 3 (найденное в table), 
а bed.glasses – значение 1 (найденное в head).

Ответьте на вопрос: как быстрее получить значение 
glasses – через pockets.glasses или 
через head.glasses? 
При необходимости составьте цепочки поиска и 
сравните их.
_____________________________________________________*/

// Часть 1(pockets → bed → table → head):
table.__proto__ = head;
bed.__proto__ = table;
pockets.__proto__ = bed;

// console.log(pockets.pen); // 3
// console.log(bed.glasses); // 1
}



{/* Куда будет произведена запись? ___________________
Объект rabbit наследует от объекта animal.

Какой объект получит свойство full при вызове 
rabbit.eat(): animal или rabbit?
 ___________________________________________________*/

 let animal = {
    eat() {
      this.full = true;
    }
  };
  
  let rabbit = {
    __proto__: animal
  };
  
  // rabbit
  //присваивание только в объекте, не в прототипе 
  rabbit.eat();

  // true
//   console.log(rabbit.full);
}



{/* Почему наедаются оба хомяка? ____________________
У нас есть два хомяка: 
шустрый (speedy) и ленивый (lazy); 
оба наследуют от общего объекта hamster.

Когда мы кормим одного хомяка, второй тоже наедается. 
Почему? Как это исправить?
____________________________________________________*/

let hamster = {
    stomach: [],
  
    eat(food) {
      this.stomach.push(food);
    }
  };
  
  let speedy = {
    __proto__: hamster
  };
  
  let lazy = {
    __proto__: hamster
  };
  
  // Этот хомяк нашёл еду
//   speedy.eat("apple");
//   console.log( speedy.stomach ); // apple
  
  // У этого хомяка тоже есть еда. Почему? Исправьте
//   console.log( lazy.stomach ); // apple

  //---------------------------------------------------
  //----------------- Ответ ---------------------------
  //---------------------------------------------------
  /*
  Потому-что мы вызываем метод прототипа, который
  мутирует существующие у себя свойство, а не
  определяем св-во в прототипе.
  */
//  console.log(speedy); // пустой объект

// определим собственное св/во у каждого объекта --------
//  hamster.eat = function(food) {
//     if(!speedy.hasOwnProperty("stomach")) speedy.stomach = [];
//     if(!lazy.hasOwnProperty("stomach")) lazy.stomach = [];
//     this.stomach.push(food); 
//  }

//  speedy.eat("apple");

//  console.log(hamster.stomach); // []
//  console.log(speedy.stomach); // ['apple']
//  console.log(lazy.stomach); // []

 //---------------------------------------------------
 /* ------- или метод заменить на аксессор -----   */
 //---------------------------------------------------

 delete hamster.eat;

 Object.defineProperty(hamster, 'stomach', {
    get() {
      return this._stomach;
    },
  
    set(food) {
      if(!this.hasOwnProperty('stomach')) {
        this._stomach = [];
      }
      return this._stomach.push(food);
    }
  });

//   speedy.stomach = "apple";
//   console.log(hamster.stomach); // undefined
//   console.log(speedy.stomach); // ['apple']
//   console.log(lazy.stomach); // undefined
}