import ZkappClient from "@/lib/zkapp_client";
import { useMinaContext } from "@/context/MinaContext";

const MINA_SUB_DECIMAL: number = 1e9;

const mina = (window as any)?.mina;

const zkClient = new ZkappClient();


