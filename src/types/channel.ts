export interface Channel {
    id: string;
    name: string;
    agent_num: string;
    state: string;
    create_at: string;
    create_name: string;
    updated_at: string;
    updated_name: string;
  }
  export interface ChannelItem {
    id?: string |undefined;
    name: string;
    state: string;
  }