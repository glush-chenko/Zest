interface NodeRequireWithContext extends NodeRequire {
    context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): { keys(): string[]; (id: string): any };
}

const context: ReturnType<(NodeRequireWithContext)['context']> = (require as NodeRequireWithContext).context(
    './',
    false,
    /\.png$/
);

export const images = context.keys().map(context);