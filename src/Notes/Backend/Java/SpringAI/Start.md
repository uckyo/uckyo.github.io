---
title: Spring AI 项目初始化依赖和配置总结
description: Spring AI 项目初始化的核心依赖、配置和环境要求总结
---

# Spring AI 项目初始化依赖和配置总结

📦 Maven 依赖配置

## 1. 基础 Spring Boot 依赖

```xml
<!-- Spring Boot Starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>

<!-- Web 支持（可选） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Lombok 工具 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.36</version>
    <optional>true</optional>
</dependency>
```

## 2. Spring AI 核心依赖

```xml
<!-- Spring AI Alibaba（阿里云大模型） -->
<dependency>
    <groupId>com.alibaba.cloud.ai</groupId>
    <artifactId>spring-ai-alibaba-starter</artifactId>
    <version>1.0.0-M6.1</version>
</dependency>

<!-- 或 Spring AI Ollama（本地模型） -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-ollama-spring-boot-starter</artifactId>
    <version>1.0.0-M6</version>
</dependency>
```

## 3. 工具库依赖

```xml
<!-- Hutool 工具库 -->
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.37</version>
</dependency>

<!-- Knife4j 接口文档 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
    <version>4.4.0</version>
</dependency>
```

## 4. 仓库配置（重要！）

由于 Spring AI 尚未发布到中央仓库，需要添加：

```xml
<repositories>
<repository>
<id>spring-milestones</id>
<name>Spring Milestones</name>
<url>https://repo.spring.io/milestone</url>
<snapshots>
<enabled>false</enabled>
</snapshots>
</repository>
</repositories>
```

⚙️ 配置文件（application.yml）

## 1. 基础应用配置

```yaml
spring:
  application:
    name: yu-ai-agent
  main:
    web-application-type: servlet

server:
  port: 8123
  servlet:
    context-path: /api
```

## 2. Spring AI 阿里云配置

```yaml
spring:
  ai:
    dashscope:
      api-key: ${AI_DASHSCOPE_API_KEY}  # 环境变量或直接写密钥
    chat:
      options:
        model: qwen-plus  # 模型名称
```

## 3. Spring AI Ollama 配置（本地模型）

```yaml
spring:
  ai:
    ollama:
      base-url: http://localhost:11434  # Ollama 服务地址
    chat:
      model: gemma3:1b  # 本地模型名称
```

## 4. 接口文档配置

```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  api-docs:
    path: /v3/api-docs
  group-configs:
    - group: 'default'
      paths-to-match: '/**'
      packages-to-scan: com.yupi.yuaiagent.controller

knife4j:
  enable: true
  setting:
    language: zh_cn
```

🔧 环境要求

### JDK 版本

- 必须使用 JDK 17 或 21
- 推荐 JDK 21（支持虚拟线程）

### Spring Boot 版本

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.4.4</version>
    <relativePath/>
</parent>
```

🎯 快速启动代码示例

### 测试控制器

```java
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public String healthCheck() {
        return "ok";
    }
}
```

### Spring AI 调用示例

```java
@Component
public class SpringAiDemo implements CommandLineRunner {

    @Resource
    private ChatModel dashscopeChatModel;
    
    @Override
    public void run(String... args) throws Exception {
        AssistantMessage output = dashscopeChatModel.call(new Prompt("你好"))
                .getResult()
                .getOutput();
        System.out.println(output.getText());
    }
}
```

⚠️ 常见问题解决

## 1. Lombok 版本冲突

```xml
<!-- 手动指定 Lombok 版本 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.36</version>
    <optional>true</optional>
</dependency>
```

## 2. 依赖下载失败

- 检查仓库配置是否正确
- 清理 Maven 本地仓库缓存
- 确认网络可访问 https://repo.spring.io

## 3. API Key 管理

- 使用环境变量：AI_DASHSCOPE_API_KEY
- 或在配置文件中直接配置（不推荐生产环境）

这个配置总结涵盖了 Spring AI 项目初始化的核心内容，可以根据具体需求选择相应的配置方案。