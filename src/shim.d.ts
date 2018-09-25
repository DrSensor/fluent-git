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

namespace GitNotes {
  type StringArgsOps = 'add' | 'append' | 'copyFrom' | 'overwrite';
  type NoArgsOps = 'remove' | 'show';

  type MutateOperation = {
    [key in GitNotes.StringArgsOps]: (txt: string) => void
  };

  type MutateLessOperation = { [key in GitNotes.NoArgsOps]: () => any };

  interface Operation extends MutateOperation, MutateLessOperation {
    remove(): void;
    show(): string;
  }

  type Options = ExecaOptions & { ref: string };
}
