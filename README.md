# OrinTabs

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/BYC30/OrinTabs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**OrinTabs is an intelligent browser tab management plugin powered by Large Language Models (LLMs). Say goodbye to tab clutter and hello to a more productive and insightful browsing experience!**

---

## ✨ 核心特性 (Key Features)

*   **智能分组 (Intelligent Grouping):** 利用 LLM 理解标签页内容，自动将相关的标签页组织到有意义的分组中。
*   **语义搜索 (Semantic Search):** 使用自然语言搜索您的标签页，而不仅仅是关键词匹配。例如：“查找我昨天看的关于人工智能研究的页面”。
*   **标签页摘要 (Tab Summarization):** 快速获取任何打开标签页的内容摘要，无需完整阅读，并可依据摘要自动创建或加入分组。
*   **上下文建议 (Contextual Suggestions):** 根据您当前的浏览活动和历史记录，推荐相关的标签页或操作。
*   **重复标签检测 (Duplicate Tab Detection):** 智能识别并帮助您管理重复打开的标签页。
*   **工作区管理 (Workspace Management):** 基于项目、任务或主题创建和切换不同的标签页工作区。
*   **自然语言命令 (Natural Language Commands):** (未来规划) 通过简单的自然语言指令管理标签，例如“关闭所有购物相关的标签”。

## 🤔 为何选择 OrinTabs? (Why OrinTabs?)

我们每天都会打开无数的浏览器标签页，很快就会陷入信息过载和混乱之中。传统的标签管理工具通常依赖于手动的组织或简单的规则。

OrinTabs 利用强大的大型语言模型 (LLM) 的能力，以更智能、更直观的方式理解和管理您的标签页。它不仅仅是整理，更是帮助您从浏览历史中提取价值。

## 🚀 如何工作 (How it Works - High Level)

OrinTabs (设想中) 会在本地或通过安全的 API 与一个大型语言模型交互。当您打开新的标签页或请求操作时：

1.  插件提取标签页的元数据（标题、URL）和/或关键内容（在用户许可下）。
2.  这些信息被发送给 LLM 进行分析（例如，分类、摘要、关系识别）。
3.  LLM 返回的结果被用来驱动插件的智能功能，如自动分组、搜索结果排序等。

## 🔑 LLM API 配置 (LLM API Configuration)

默认实现使用 [OpenAI](https://openai.com/) 的接口进行摘要处理。安装插件后，点击图标可在弹出的菜单中配置 **LLM API URL** 以及 **API Key**。保存设置后，插件会使用您提供的后端和密钥进行摘要调用。

## 📖 使用指南 (Usage)

1.  在浏览器扩展管理页面选择“加载已解压的扩展程序”，并指向本仓库的 `src` 目录。
2.  安装插件后，点击浏览器工具栏上的 OrinTabs 图标。
3.  在弹出的菜单底部填入您希望使用的 **LLM API URL** 和 **API Key**，点击“Save Settings” 保存。
4.  点击“Intelligent Group”按钮以根据域名对当前窗口的标签页进行分组。这是对未来 LLM 分组功能的简化实现。
5.  点击“Summarize & Group”按钮，让插件读取当前活动标签页内容，调用大型语言模型生成摘要，并基于摘要自动创建或加入相应分组。
6.  使用顶部的搜索框进行自然语言搜索。
7.  右键点击标签页或分组以获取更多选项 (例如，摘要、添加到工作区)。

## 🔄 自动发布 (Automated Release)
本仓库提供 `Build and Release Chrome Extension` 的 GitHub Actions 工作流。

在 GitHub 的 **Actions** 选项卡中手动触发该流程，并填写发布版本号后，
它会创建 `release-{version}` 分支并打包 `src` 目录生成 `OrinTabs.zip`，
随后将这个压缩包上传到新的 Release 中。


## 💡 未来规划 (Roadmap)

*   [ ] **更高级的 LLM 集成:** 例如，基于标签页内容的问答。
*   [ ] **跨设备同步:** (如果可行且安全)
*   [ ] **可定制的规则引擎:** 允许用户自定义 LLM 的行为。
*   [ ] **与其他生产力工具集成。**
*   [ ] **主题和个性化选项。**

## 🤝 贡献 (Contributing)

欢迎各种形式的贡献！如果您有任何想法、建议或想要修复 Bug，请随时：

1.  Fork 本仓库。
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到分支 (`git push origin feature/AmazingFeature`)。
5.  打开一个 Pull Request。

## 📝 许可证 (License)

本项目使用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 🙏 致谢 (Acknowledgements)

*   感谢所有为大型语言模型研究做出贡献的研究者和开发者。

---

**现在就来体验 OrinTabs，让 AI 助您掌控浏览器标签页！**
