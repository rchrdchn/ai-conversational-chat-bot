export interface Message {
   text: string;
   isUser: boolean;
}
 
 export interface Conversation {
   id: string;
   title: string;
   messages: Message[];
   firstUserMessage?: string;
   createdAt: number;
}
 
 export interface ConversationHistory {
   id: string;
   title?: string;
   firstUserMessage?: string;
   createdAt: string;
}