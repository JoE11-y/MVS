import ZkappClient from "@/lib/zkapp_client";
import React, { createContext, useContext, useMemo, useReducer } from "react";

interface State {
    hasWallet: boolean,
    walletConnected: boolean,
    accountExists: boolean,
    publicKey58: string,
    network: string,
}

const INITIAL_STATE: State = {
    hasWallet: false,
    walletConnected: false,
    accountExists: false,
    publicKey58: '',
    network: '',
}

const UPDATE_STATE = "UPDATE_STATE"

interface UpdateState {
    type: "UPDATE_STATE";
    data: {
        hasWallet?: boolean;
        walletConnected?: boolean;
        accountExists?: boolean;
        publicKey58?: string;
        network?: string;
    }
}

interface UpdateArgs {
    hasWallet?: boolean;
    walletConnected?: boolean;
    accountExists?: boolean;
    publicKey58?: string;
    network?: string;
}

type Action = UpdateState;

function reducer(state: State, action: Action) {
    switch (action.type) {
        case UPDATE_STATE: {
            const { hasWallet, walletConnected, accountExists, publicKey58, network } = action.data;
            return {
                ...state,
                hasWallet: hasWallet ? hasWallet : state.hasWallet,
                walletConnected: walletConnected ? walletConnected : state.walletConnected,
                accountExists: accountExists ? accountExists : state.accountExists,
                publicKey58: publicKey58 ? publicKey58 : state.publicKey58,
                network: network ? network : state.network,
            } as State;
        }
        default:
            return state;
    }
}

const MinaContext = createContext({
    state: INITIAL_STATE,
    updateState: (_data: UpdateArgs) => { },
});

export function useMinaContext() {
    return useContext(MinaContext);
}

interface Props {
    children: React.ReactNode;
}
export const MinaProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    function updateState(data: UpdateArgs) {
        dispatch({
            type: UPDATE_STATE,
            data
        });
    }

    return (
        <MinaContext.Provider
            value={useMemo(
                () => ({
                    state,
                    updateState
                }),
                [state]
            )}
        >
            {children}
        </MinaContext.Provider>
    )
}

