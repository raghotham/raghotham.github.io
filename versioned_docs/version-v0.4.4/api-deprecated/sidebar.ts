import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api-deprecated/llama-stack-specification-deprecated-apis",
    },
    {
      type: "category",
      label: "Benchmarks",
      link: {
        type: "doc",
        id: "api-deprecated/benchmarks",
      },
      items: [
        {
          type: "doc",
          id: "api-deprecated/list-benchmarks-v-1-alpha-eval-benchmarks-get",
          label: "List all benchmarks.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/register-benchmark-v-1-alpha-eval-benchmarks-post",
          label: "Register a benchmark.",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/get-benchmark-v-1-alpha-eval-benchmarks-benchmark-id-get",
          label: "Get a benchmark by its ID.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/unregister-benchmark-v-1-alpha-eval-benchmarks-benchmark-id-delete",
          label: "Unregister a benchmark.",
          className: "menu__list-item--deprecated api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Datasets",
      link: {
        type: "doc",
        id: "api-deprecated/datasets",
      },
      items: [
        {
          type: "doc",
          id: "api-deprecated/list-datasets-v-1-beta-datasets-get",
          label: "List all datasets.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/register-dataset-v-1-beta-datasets-post",
          label: "Register a new dataset.",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/get-dataset-v-1-beta-datasets-dataset-id-get",
          label: "Get a dataset by its ID.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/unregister-dataset-v-1-beta-datasets-dataset-id-delete",
          label: "Unregister a dataset by its ID.",
          className: "menu__list-item--deprecated api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Models",
      link: {
        type: "doc",
        id: "api-deprecated/models",
      },
      items: [
        {
          type: "doc",
          id: "api-deprecated/openai-list-models-v-1-models-get",
          label: "Openai List Models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/register-model-v-1-models-post",
          label: "Register Model",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/get-model-v-1-models-model-id-get",
          label: "Get Model",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/unregister-model-v-1-models-model-id-delete",
          label: "Unregister Model",
          className: "menu__list-item--deprecated api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Shields",
      link: {
        type: "doc",
        id: "api-deprecated/shields",
      },
      items: [
        {
          type: "doc",
          id: "api-deprecated/list-shields-v-1-shields-get",
          label: "List Shields",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/register-shield-v-1-shields-post",
          label: "Register Shield",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/get-shield-v-1-shields-identifier-get",
          label: "Get Shield",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/unregister-shield-v-1-shields-identifier-delete",
          label: "Unregister Shield",
          className: "menu__list-item--deprecated api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Scoring Functions",
      items: [
        {
          type: "doc",
          id: "api-deprecated/list-scoring-functions-v-1-scoring-functions-get",
          label: "List Scoring Functions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/register-scoring-function-v-1-scoring-functions-post",
          label: "Register Scoring Function",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/get-scoring-function-v-1-scoring-functions-scoring-fn-id-get",
          label: "Get Scoring Function",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/unregister-scoring-function-v-1-scoring-functions-scoring-fn-id-delete",
          label: "Unregister Scoring Function",
          className: "menu__list-item--deprecated api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Tool Runtime",
      items: [
        {
          type: "doc",
          id: "api-deprecated/invoke-tool-v-1-tool-runtime-invoke-post",
          label: "Invoke Tool",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/list-runtime-tools-v-1-tool-runtime-list-tools-get",
          label: "List Runtime Tools",
          className: "menu__list-item--deprecated api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Tool Groups",
      items: [
        {
          type: "doc",
          id: "api-deprecated/list-tool-groups-v-1-toolgroups-get",
          label: "List Tool Groups",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/register-tool-group-v-1-toolgroups-post",
          label: "Register Tool Group",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api-deprecated/get-tool-group-v-1-toolgroups-toolgroup-id-get",
          label: "Get Tool Group",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/unregister-toolgroup-v-1-toolgroups-toolgroup-id-delete",
          label: "Unregister Toolgroup",
          className: "menu__list-item--deprecated api-method delete",
        },
        {
          type: "doc",
          id: "api-deprecated/list-tools-v-1-tools-get",
          label: "List Tools",
          className: "menu__list-item--deprecated api-method get",
        },
        {
          type: "doc",
          id: "api-deprecated/get-tool-v-1-tools-tool-name-get",
          label: "Get Tool",
          className: "menu__list-item--deprecated api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
