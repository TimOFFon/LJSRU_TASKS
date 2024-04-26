/*-----------------------------------------------------
==========================================================
==========================================================
     Задачи LJSRU / параграф Методы прототипов
==========================================================
==========================================================
---------------------------------------------------- */

/*-------------------------------------------------------
------------- Добавьте toString в словарь ---------------
---------------------------------------------------------
Имеется объект dictionary, созданный с помощью 
Object.create(null) для хранения любых 
пар ключ/значение.

Добавьте ему метод dictionary.toString(), к
оторый должен возвращать список ключей, 
разделённых запятой. Ваш toString не должен 
выводиться при итерации объекта с помощью цикла for..in.


Вот так это должно работать:

let dictionary = Object.create(null);

// ваш код, который добавляет метод dictionary.toString

// добавляем немного данных
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; 
// здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
for(let key in dictionary) {
  alert(key); // "apple", затем "__proto__"
}

// ваш метод toString в действии
alert(dictionary); // "apple,__proto__"
*/
{
  let dictionary = Object.create(null);

  Object.defineProperty(dictionary, "toString", {
    value() {
      return Object.keys(this).join();
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });

  dictionary.apple = "Apple";
  dictionary.__proto__ = "test";

  //   for(let key in dictionary) {
  //     console.log(key); // "apple",  "__proto__"
  //   }

  //   console.log(''+ dictionary); // "apple,__proto__"
}

/*-------------------------------------------------------
----------------- Разница между вызовами ----------------
---------------------------------------------------------

Давайте создадим новый объект rabbit:
------------------------------------------------------ */
{
  function Rabbit(name) {
    this.name = name;
  }
  Rabbit.prototype.sayHi = function () {
    console.log(this.name);
  };

  let rabbit = new Rabbit("Rabbit");

  // Все эти вызовы делают одно и тоже или нет?
//   rabbit.sayHi();
//   Rabbit.prototype.sayHi();
//   Object.getPrototypeOf(rabbit).sayHi();
//   rabbit.__proto__.sayHi();

  //1 "Rabbit"
  //2 undefined
  //3 undefined
  //4 undefined
  
}
