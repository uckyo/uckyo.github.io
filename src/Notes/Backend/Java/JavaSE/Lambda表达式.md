# 什么是Lambda表达式

Lambda表达式是Java 8引入的一种新特性，它是一种简洁的表示可传递的匿名函数的方式。Lambda表达式可以替代匿名内部类，使代码更加简洁易读。

# Lambda表达式的语法

Lambda表达式的基本语法如下：

```java
(参数列表) -> 表达式

// 或者

(参数列表) -> {
    语句块
};
```

## 语法说明

- **参数列表**：可以为空，也可以包含一个或多个参数
- **->**：Lambda运算符，用于分隔参数列表和表达式/语句块
- **表达式**：当只有一条语句时，可以直接写表达式，表达式的结果会自动作为返回值
- **语句块**：当有多条语句时，需要使用大括号包围，并且需要显式使用return语句返回值

# Lambda表达式的特点

1. **简洁性**：Lambda表达式比匿名内部类更加简洁
2. **函数式编程**：Lambda表达式支持函数式编程风格
3. **可传递性**：Lambda表达式可以作为参数传递给方法
4. **类型推断**：编译器可以根据上下文推断Lambda表达式的参数类型

# Lambda表达式的使用场景

Lambda表达式主要用于以下场景：

1. **函数式接口**：实现函数式接口的抽象方法
2. **集合操作**：使用Stream API进行集合操作
3. **线程创建**：创建线程或Runnable实例
4. **事件处理**：处理GUI事件

# 函数式接口

函数式接口是只包含一个抽象方法的接口。Lambda表达式可以隐式地实现函数式接口。

## 内置函数式接口

Java 8在`java.util.function`包中提供了一些内置的函数式接口：

| 接口名称 | 参数类型 | 返回类型 | 描述 |
|---------|---------|---------|------|
| `Supplier<T>` | 无 | T | 提供一个T类型的值 |
| `Consumer<T>` | T | 无 | 消费一个T类型的值 |
| `Function<T, R>` | T | R | 将T类型转换为R类型 |
| `Predicate<T>` | T | boolean | 对T类型进行判断，返回布尔值 |
| `BiFunction<T, U, R>` | T, U | R | 将T和U类型转换为R类型 |
| `BiConsumer<T, U>` | T, U | 无 | 消费T和U类型的值 |
| `BiPredicate<T, U>` | T, U | boolean | 对T和U类型进行判断，返回布尔值 |

# Lambda表达式的示例

## 示例1：基本语法

```java
// 无参数，无返回值
Runnable runnable = () -> System.out.println("Hello, Lambda!");
runnable.run(); // 输出：Hello, Lambda!

// 单个参数，无返回值
Consumer<String> consumer = (s) -> System.out.println(s);
consumer.accept("Hello, Consumer!"); // 输出：Hello, Consumer!

// 单个参数，类型推断
Consumer<String> consumer2 = s -> System.out.println(s);
consumer2.accept("Hello, Type Inference!"); // 输出：Hello, Type Inference!

// 多个参数，有返回值
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
int result = add.apply(10, 20);
System.out.println("Add result: " + result); // 输出：Add result: 30

// 多条语句，需要大括号和return
Function<Integer, Integer> square = (n) -> {
    int result1 = n * n;
    return result1;
};
System.out.println("Square result: " + square.apply(5)); // 输出：Square result: 25
```

## 示例2：集合操作

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// 使用Lambda表达式排序
names.sort((s1, s2) -> s1.compareTo(s2));
System.out.println("Sorted names: " + names);

// 使用Lambda表达式过滤
List<String> filteredNames = names.stream()
    .filter(name -> name.length() > 3)
    .collect(Collectors.toList());
System.out.println("Filtered names: " + filteredNames);

// 使用Lambda表达式映射
List<Integer> nameLengths = names.stream()
    .map(name -> name.length())
    .collect(Collectors.toList());
System.out.println("Name lengths: " + nameLengths);

// 使用Lambda表达式归约
int totalLength = names.stream()
    .mapToInt(name -> name.length())
    .sum();
System.out.println("Total length: " + totalLength);
```

## 示例3：线程创建

```java
// 使用Lambda表达式创建线程
Thread thread = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Thread: " + i);
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
});

thread.start();
```

## 示例4：自定义函数式接口

```java
// 自定义函数式接口
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class LambdaExample {
    public static void main(String[] args) {
        // 使用Lambda表达式实现自定义函数式接口
        Calculator add = (a, b) -> a + b;
        Calculator subtract = (a, b) -> a - b;
        Calculator multiply = (a, b) -> a * b;
        Calculator divide = (a, b) -> a / b;
        
        System.out.println("Add: " + add.calculate(10, 5)); // 输出：Add: 15
        System.out.println("Subtract: " + subtract.calculate(10, 5)); // 输出：Subtract: 5
        System.out.println("Multiply: " + multiply.calculate(10, 5)); // 输出：Multiply: 50
        System.out.println("Divide: " + divide.calculate(10, 5)); // 输出：Divide: 2
    }
}
```

# Lambda表达式与匿名内部类的比较

| 特性 | Lambda表达式 | 匿名内部类 |
|------|------------|-----------|
| 语法 | 简洁，一行代码 | 冗长，需要完整的类定义 |
| 类型推断 | 编译器自动推断 | 需要显式指定类型 |
| this关键字 | 指向外部类的this | 指向匿名内部类本身 |
| 适用场景 | 函数式接口 | 可以实现任意接口或继承任意类 |

# Lambda表达式的注意事项

1. **变量作用域**：Lambda表达式可以访问外部的final或effectively final变量
2. **this关键字**：Lambda表达式中的this指向外部类的this
3. **异常处理**：Lambda表达式中可以抛出异常，但需要确保函数式接口的方法声明了该异常
4. **类型推断**：编译器会根据上下文推断Lambda表达式的参数类型，但在某些复杂情况下可能需要显式指定类型

# 示例代码

## Lambda表达式的完整示例

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.*;
import java.util.stream.Collectors;

// 自定义函数式接口
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class LambdaExpressionExample {
    public static void main(String[] args) {
        // 示例1：基本用法
        System.out.println("=== 示例1：基本用法 ===");
        
        // 无参数
        Runnable runnable = () -> System.out.println("Hello, Lambda!");
        runnable.run();
        
        // 单个参数
        Consumer<String> consumer = s -> System.out.println("Hello, " + s);
        consumer.accept("World!");
        
        // 多个参数
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        System.out.println("10 + 5 = " + add.apply(10, 5));
        
        // 多条语句
        Function<Integer, String> convert = n -> {
            if (n > 0) {
                return "Positive";
            } else if (n < 0) {
                return "Negative";
            } else {
                return "Zero";
            }
        };
        System.out.println("5 is " + convert.apply(5));
        
        // 示例2：使用自定义函数式接口
        System.out.println("\n=== 示例2：使用自定义函数式接口 ===");
        
        MathOperation addition = (a, b) -> a + b;
        MathOperation subtraction = (a, b) -> a - b;
        MathOperation multiplication = (a, b) -> a * b;
        MathOperation division = (a, b) -> a / b;
        
        System.out.println("10 + 5 = " + addition.operate(10, 5));
        System.out.println("10 - 5 = " + subtraction.operate(10, 5));
        System.out.println("10 * 5 = " + multiplication.operate(10, 5));
        System.out.println("10 / 5 = " + division.operate(10, 5));
        
        // 示例3：集合操作
        System.out.println("\n=== 示例3：集合操作 ===");
        
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");
        
        // 排序
        names.sort((s1, s2) -> s1.compareTo(s2));
        System.out.println("Sorted names: " + names);
        
        // 过滤
        List<String> longNames = names.stream()
            .filter(name -> name.length() > 4)
            .collect(Collectors.toList());
        System.out.println("Names longer than 4 characters: " + longNames);
        
        // 映射
        List<Integer> nameLengths = names.stream()
            .map(name -> name.length())
            .collect(Collectors.toList());
        System.out.println("Name lengths: " + nameLengths);
        
        // 归约
        int totalLength = names.stream()
            .mapToInt(name -> name.length())
            .sum();
        System.out.println("Total length of all names: " + totalLength);
        
        // 示例4：线程创建
        System.out.println("\n=== 示例4：线程创建 ===");
        
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Thread iteration: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        thread.start();
        
        // 等待线程完成
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("\nAll examples completed!");
    }
}
```

# 总结

Lambda表达式是Java 8引入的一种简洁、灵活的函数式编程特性，它可以替代匿名内部类，使代码更加简洁易读。Lambda表达式主要用于实现函数式接口，特别适合于集合操作、线程创建和事件处理等场景。

Lambda表达式的语法简洁明了，使用`(参数列表) -> 表达式/语句块`的形式，可以根据上下文自动推断参数类型。Lambda表达式中的this指向外部类的this，可以访问外部的final或effectively final变量。

合理使用Lambda表达式可以使代码更加简洁、清晰，提高代码的可读性和可维护性。