import { parse } from 'ts-command-line-args';

interface IBuildArguments {
    contract_name: string;
}

export const args = parse<IBuildArguments>(
    {
        contract_name: String
    }
);