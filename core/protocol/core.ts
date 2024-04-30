import type {
  BrowserSerializedContinueConfig,
  ChatMessage,
  ContextItemWithId,
  ContextSubmenuItem,
  DiffLine,
  LLMFullCompletionOptions,
  MessageContent,
  ModelDescription,
  PersistedSessionInfo,
  RangeInFile,
  SerializedContinueConfig,
  SessionInfo,
} from "..";
import type { AutocompleteInput } from "../autocomplete/completionProvider";
import type { IdeSettings } from "./ideWebview";

export type ProtocolGeneratorType<T> = AsyncGenerator<{
  done?: boolean;
  content: T;
}>;

export type ToCoreFromIdeOrWebviewProtocol = {
  // New
  "update/modelChange": [string, void];

  // Special
  ping: [string, string];
  abort: [undefined, void];

  "history/list": [undefined, SessionInfo[]];
  "history/delete": [{ id: string }, void];
  "history/load": [{ id: string }, PersistedSessionInfo];
  "history/save": [PersistedSessionInfo, void];
  "devdata/log": [{ tableName: string; data: any }, void];
  "config/addOpenAiKey": [string, void];
  "config/addModel": [
    { model: SerializedContinueConfig["models"][number] },
    void,
  ];
  "config/ideSettingsUpdate": [IdeSettings, void];
  "config/getBrowserSerialized": [undefined, BrowserSerializedContinueConfig];
  "config/deleteModel": [{ title: string }, void];
  "config/reload": [undefined, BrowserSerializedContinueConfig];
  "context/getContextItems": [
    {
      name: string;
      query: string;
      fullInput: string;
      selectedCode: RangeInFile[];
    },
    ContextItemWithId[],
  ];
  "context/loadSubmenuItems": [{ title: string }, ContextSubmenuItem[]];
  "autocomplete/complete": [AutocompleteInput, string[]];
  "context/addDocs": [SiteIndexingConfig, void];
  "autocomplete/cancel": [undefined, void];
  "autocomplete/accept": [{ completionId: string }, void];
  "command/run": [
    {
      input: string;
      history: ChatMessage[];
      modelTitle: string;
      slashCommandName: string;
      contextItems: ContextItemWithId[];
      params: any;
      historyIndex: number;
      selectedCode: RangeInFile[];
    },
    ProtocolGeneratorType<string>,
  ];
  "llm/complete": [
    {
      prompt: string;
      completionOptions: LLMFullCompletionOptions;
      title: string;
    },
    string,
  ];
  "llm/listModels": [{ title: string }, string[] | undefined];
  "llm/streamComplete": [
    {
      prompt: string;
      completionOptions: LLMFullCompletionOptions;
      title: string;
    },
    ProtocolGeneratorType<string>,
  ];
  "llm/streamChat": [
    {
      messages: ChatMessage[];
      completionOptions: LLMFullCompletionOptions;
      title: string;
    },
    ProtocolGeneratorType<MessageContent>,
  ];
  streamDiffLines: [
    {
      prefix: string;
      highlighted: string;
      suffix: string;
      input: string;
      language: string | undefined;
      modelTitle: string | undefined;
    },
    ProtocolGeneratorType<DiffLine>,
  ];
  "stats/getTokensPerDay": [undefined, { day: string; tokens: number }[]];
  "stats/getTokensPerModel": [undefined, { model: string; tokens: number }[]];
  "index/setPaused": [boolean, void];
  "index/forceReIndex": [undefined, void];
  completeOnboarding: [
    {
      mode:
        | "local"
        | "optimized"
        | "custom"
        | "localExistingUser"
        | "optimizedExistingUser";
    },
    void,
  ];
};
