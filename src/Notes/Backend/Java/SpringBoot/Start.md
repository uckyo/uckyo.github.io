# Spring Boot 快速入门

Spring Boot 是 Spring 框架的一个子项目，设计目的是为了简化 Spring 应用的初始搭建和开发过程。通过自动配置、内嵌服务器和 starter 依赖等特性，Spring Boot 大大减少了配置文件的编写，让开发者能够更专注于业务逻辑的实现，从而提高开发效率。

## 环境要求

- Java 17 或更高版本
- Maven
- IntelliJ IDEA

## 创建 Spring Boot 项目

1. 打开 IntelliJ IDEA
2. 点击 "New Project"
3. 选择 "Spring Boot"
4. 填写项目信息
5. 点击 "下一步"
6. 选择 Spring Boot 版本
7. 在 "Dependencies" 中选择 "Spring Web"
8. 点击 "下一步"

## 创建控制器

```java
// controller/HealthController.java

package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public String healthCheck() {
        return "ok";
    }
}
```

## 运行应用

在 IntelliJ IDEA 中：

1. 找到项目根目录下的 `Application` 类
2. 右键点击该类，选择 "Run 'Application.main()'"

## 测试

访问 `http://localhost:8080/health`查看结果

## 总结

Spring Boot 之所以如此方便，主要有以下几个原因：

1. **自动配置**：Spring Boot 会根据项目依赖自动配置应用，减少了大量的 XML 配置文件
2. **内嵌服务器**：内置了 Tomcat、Jetty 等服务器，无需单独部署
3. **starter 依赖**：通过 starter 依赖可以快速添加所需功能，如 Spring Web、Spring Data JPA 等
4. **开发工具支持**：与 IntelliJ IDEA 等 IDE 深度集成，提供快速创建、运行和调试功能
5. **生产就绪**：提供了健康检查、监控等生产环境所需的功能
6. **简洁的代码结构**：通过注解和约定优于配置的理念，减少了样板代码

这些特性使得开发者可以专注于业务逻辑的实现，而不是繁琐的配置和搭建工作，大大提高了开发效率。
