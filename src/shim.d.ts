interface Operation {
  name: string;
  data: any;
}

interface BasePanic {
  operation: Operation;
  data: any;
}

interface Panic extends BasePanic {
  suggestion: string | ((panic: BasePanic) => string);
}
