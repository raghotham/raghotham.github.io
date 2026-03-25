import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api-experimental/llama-stack-specification-experimental-apis",
    },
    {
      type: "category",
      label: "Benchmarks",
      link: {
        type: "doc",
        id: "api-experimental/benchmarks",
      },
      items: [
        {
          type: "doc",
          id: "api-experimental/list-benchmarks-v-1-alpha-eval-benchmarks-get",
          label: "List all benchmarks.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/get-benchmark-v-1-alpha-eval-benchmarks-benchmark-id-get",
          label: "Get a benchmark by its ID.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Datasets",
      link: {
        type: "doc",
        id: "api-experimental/datasets",
      },
      items: [
        {
          type: "doc",
          id: "api-experimental/list-datasets-v-1-beta-datasets-get",
          label: "List all datasets.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/get-dataset-v-1-beta-datasets-dataset-id-get",
          label: "Get a dataset by its ID.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Evaluations",
      link: {
        type: "doc",
        id: "api-experimental/eval",
      },
      items: [
        {
          type: "doc",
          id: "api-experimental/evaluate-rows-v-1-alpha-eval-benchmarks-benchmark-id-evaluations-post",
          label: "Evaluate Rows",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-experimental/run-eval-v-1-alpha-eval-benchmarks-benchmark-id-jobs-post",
          label: "Run Eval",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-experimental/job-status-v-1-alpha-eval-benchmarks-benchmark-id-jobs-job-id-get",
          label: "Job Status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/job-cancel-v-1-alpha-eval-benchmarks-benchmark-id-jobs-job-id-delete",
          label: "Job Cancel",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api-experimental/job-result-v-1-alpha-eval-benchmarks-benchmark-id-jobs-job-id-result-get",
          label: "Job Result",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Inference",
      link: {
        type: "doc",
        id: "api-experimental/inference",
      },
      items: [
        {
          type: "doc",
          id: "api-experimental/rerank-v-1-alpha-inference-rerank-post",
          label: "Rerank",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Datasetio",
      items: [
        {
          type: "doc",
          id: "api-experimental/append-rows-v-1-beta-datasetio-append-rows-dataset-id-post",
          label: "Append Rows",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-experimental/iterrows-v-1-beta-datasetio-iterrows-dataset-id-get",
          label: "Iterrows",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Post Training",
      items: [
        {
          type: "doc",
          id: "api-experimental/get-training-job-artifacts-v-1-alpha-post-training-job-artifacts-get",
          label: "Get Training Job Artifacts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/cancel-training-job-v-1-alpha-post-training-job-cancel-post",
          label: "Cancel Training Job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-experimental/get-training-job-status-v-1-alpha-post-training-job-status-get",
          label: "Get Training Job Status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/get-training-jobs-v-1-alpha-post-training-jobs-get",
          label: "Get Training Jobs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/preference-optimize-v-1-alpha-post-training-preference-optimize-post",
          label: "Preference Optimize",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-experimental/supervised-fine-tune-v-1-alpha-post-training-supervised-fine-tune-post",
          label: "Supervised Fine Tune",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Admin",
      items: [
        {
          type: "doc",
          id: "api-experimental/list-providers-v-1-alpha-admin-providers-get",
          label: "List all available providers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/inspect-provider-v-1-alpha-admin-providers-provider-id-get",
          label: "Get provider details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/list-routes-v-1-alpha-admin-inspect-routes-get",
          label: "List all available API routes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/health-v-1-alpha-admin-health-get",
          label: "Get service health status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/version-v-1-alpha-admin-version-get",
          label: "Get service version",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Connectors",
      items: [
        {
          type: "doc",
          id: "api-experimental/get-connector-v-1-alpha-connectors-connector-id-get",
          label: "Get Connector",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/get-connector-tool-v-1-alpha-connectors-connector-id-tools-tool-name-get",
          label: "Get Connector Tool",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/list-connector-tools-v-1-alpha-connectors-connector-id-tools-get",
          label: "List Connector Tools",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-experimental/list-connectors-v-1-alpha-connectors-get",
          label: "List Connectors",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
