import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/llama-stack-specification",
    },
    {
      type: "category",
      label: "Agents",
      link: {
        type: "doc",
        id: "api/agents",
      },
      items: [
        {
          type: "doc",
          id: "api/list-openai-responses-v-1-responses-get",
          label: "List Openai Responses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-openai-response-v-1-responses-post",
          label: "Create Openai Response",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-openai-response-v-1-responses-response-id-get",
          label: "Get Openai Response",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-openai-response-v-1-responses-response-id-delete",
          label: "Delete Openai Response",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/list-openai-response-input-items-v-1-responses-response-id-input-items-get",
          label: "List Openai Response Input Items",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "The Batches API enables efficient processing of multiple requests in a single operation, particularly useful for processing large datasets, batch evaluation workflows, and cost-effective inference at scale.",
      link: {
        type: "doc",
        id: "api/batches",
      },
      items: [
        {
          type: "doc",
          id: "api/list-batches-v-1-batches-get",
          label: "List all batches for the current user.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-batch-v-1-batches-post",
          label: "Create a new batch for processing multiple API requests.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/retrieve-batch-v-1-batches-batch-id-get",
          label: "Retrieve information about a specific batch.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/cancel-batch-v-1-batches-batch-id-cancel-post",
          label: "Cancel a batch that is in progress.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Conversations",
      link: {
        type: "doc",
        id: "api/conversations",
      },
      items: [
        {
          type: "doc",
          id: "api/create-conversation-v-1-conversations-post",
          label: "Create Conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-conversation-v-1-conversations-conversation-id-get",
          label: "Get Conversation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/update-conversation-v-1-conversations-conversation-id-post",
          label: "Update Conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-delete-conversation-v-1-conversations-conversation-id-delete",
          label: "Openai Delete Conversation",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/list-items-v-1-conversations-conversation-id-items-get",
          label: "List Items",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/add-items-v-1-conversations-conversation-id-items-post",
          label: "Add Items",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/retrieve-v-1-conversations-conversation-id-items-item-id-get",
          label: "Retrieve",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-delete-conversation-item-v-1-conversations-conversation-id-items-item-id-delete",
          label: "Openai Delete Conversation Item",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Files",
      link: {
        type: "doc",
        id: "api/files",
      },
      items: [
        {
          type: "doc",
          id: "api/list-files-v-1-files-get",
          label: "List files",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/upload-file-v-1-files-post",
          label: "Upload file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-file-v-1-files-file-id-get",
          label: "Get file",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-file-v-1-files-file-id-delete",
          label: "Delete file",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/retrieve-file-content-v-1-files-file-id-content-get",
          label: "Retrieve file content",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Inference",
      link: {
        type: "doc",
        id: "api/inference",
      },
      items: [
        {
          type: "doc",
          id: "api/list-chat-completions-v-1-chat-completions-get",
          label: "List Chat Completions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-chat-completion-v-1-chat-completions-post",
          label: "Openai Chat Completion",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-chat-completion-v-1-chat-completions-completion-id-get",
          label: "Get Chat Completion",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-completion-v-1-completions-post",
          label: "Openai Completion",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-embeddings-v-1-embeddings-post",
          label: "Openai Embeddings",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Inspect",
      link: {
        type: "doc",
        id: "api/inspect",
      },
      items: [
        {
          type: "doc",
          id: "api/health-v-1-health-get",
          label: "Get health status.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/list-routes-v-1-inspect-routes-get",
          label: "List routes.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/version-v-1-version-get",
          label: "Get version.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Models",
      link: {
        type: "doc",
        id: "api/models",
      },
      items: [
        {
          type: "doc",
          id: "api/openai-list-models-v-1-models-get",
          label: "Openai List Models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-model-v-1-models-model-id-get",
          label: "Get Model",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Prompts",
      link: {
        type: "doc",
        id: "api/prompts",
      },
      items: [
        {
          type: "doc",
          id: "api/list-prompts-v-1-prompts-get",
          label: "List Prompts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-prompt-v-1-prompts-post",
          label: "Create Prompt",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-prompt-v-1-prompts-prompt-id-get",
          label: "Get Prompt",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/update-prompt-v-1-prompts-prompt-id-post",
          label: "Update Prompt",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-prompt-v-1-prompts-prompt-id-delete",
          label: "Delete Prompt",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/set-default-version-v-1-prompts-prompt-id-set-default-version-post",
          label: "Set Default Version",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-prompt-versions-v-1-prompts-prompt-id-versions-get",
          label: "List Prompt Versions",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Providers",
      link: {
        type: "doc",
        id: "api/providers",
      },
      items: [
        {
          type: "doc",
          id: "api/list-providers-v-1-providers-get",
          label: "List providers.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/inspect-provider-v-1-providers-provider-id-get",
          label: "Get provider.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Safety",
      link: {
        type: "doc",
        id: "api/safety",
      },
      items: [
        {
          type: "doc",
          id: "api/run-moderation-v-1-moderations-post",
          label: "Run Moderation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/run-shield-v-1-safety-run-shield-post",
          label: "Run Shield",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Scoring",
      link: {
        type: "doc",
        id: "api/scoring",
      },
      items: [
        {
          type: "doc",
          id: "api/score-v-1-scoring-score-post",
          label: "Score",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/score-batch-v-1-scoring-score-batch-post",
          label: "Score Batch",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Shields",
      link: {
        type: "doc",
        id: "api/shields",
      },
      items: [
        {
          type: "doc",
          id: "api/list-shields-v-1-shields-get",
          label: "List Shields",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-shield-v-1-shields-identifier-get",
          label: "Get Shield",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Scoring Functions",
      items: [
        {
          type: "doc",
          id: "api/list-scoring-functions-v-1-scoring-functions-get",
          label: "List Scoring Functions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-scoring-function-v-1-scoring-functions-scoring-fn-id-get",
          label: "Get Scoring Function",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Vector Io",
      items: [
        {
          type: "doc",
          id: "api/insert-chunks-v-1-vector-io-insert-post",
          label: "Insert Chunks",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/query-chunks-v-1-vector-io-query-post",
          label: "Query Chunks",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-list-vector-stores-v-1-vector-stores-get",
          label: "Openai List Vector Stores",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-create-vector-store-v-1-vector-stores-post",
          label: "Openai Create Vector Store",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-retrieve-vector-store-v-1-vector-stores-vector-store-id-get",
          label: "Openai Retrieve Vector Store",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-update-vector-store-v-1-vector-stores-vector-store-id-post",
          label: "Openai Update Vector Store",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-delete-vector-store-v-1-vector-stores-vector-store-id-delete",
          label: "Openai Delete Vector Store",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/openai-create-vector-store-file-batch-v-1-vector-stores-vector-store-id-file-batches-post",
          label: "Openai Create Vector Store File Batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-retrieve-vector-store-file-batch-v-1-vector-stores-vector-store-id-file-batches-batch-id-get",
          label: "Openai Retrieve Vector Store File Batch",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-cancel-vector-store-file-batch-v-1-vector-stores-vector-store-id-file-batches-batch-id-cancel-post",
          label: "Openai Cancel Vector Store File Batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-list-files-in-vector-store-file-batch-v-1-vector-stores-vector-store-id-file-batches-batch-id-files-get",
          label: "Openai List Files In Vector Store File Batch",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-list-files-in-vector-store-v-1-vector-stores-vector-store-id-files-get",
          label: "Openai List Files In Vector Store",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-attach-file-to-vector-store-v-1-vector-stores-vector-store-id-files-post",
          label: "Openai Attach File To Vector Store",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-retrieve-vector-store-file-v-1-vector-stores-vector-store-id-files-file-id-get",
          label: "Openai Retrieve Vector Store File",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-update-vector-store-file-v-1-vector-stores-vector-store-id-files-file-id-post",
          label: "Openai Update Vector Store File",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openai-delete-vector-store-file-v-1-vector-stores-vector-store-id-files-file-id-delete",
          label: "Openai Delete Vector Store File",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/openai-retrieve-vector-store-file-contents-v-1-vector-stores-vector-store-id-files-file-id-content-get",
          label: "Openai Retrieve Vector Store File Contents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openai-search-vector-store-v-1-vector-stores-vector-store-id-search-post",
          label: "Openai Search Vector Store",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
