// This file is generated, do not edit.
// TypeScript Version: 2.2
/// <reference types="node" />
declare module "obs-websocket-js" {
  import { EventEmitter } from "events";

  namespace ObsWebSocket {
    interface ObsError {
      messageId: string;
      status: "error";
      error: string;
    }

    interface Scene {
      name: string;
      sources: ObsWebSocket.Source[];
    }

    interface Source {
      cy: number;
      cx: number;
      name: string;
      render: boolean;
      source_cx: number;
      source_cy: number;
      type: string;
      volume: number;
      x: number;
      y: number;
    }
  }

  class ObsWebSocket extends EventEmitter {
    connect(
      options?: { address?: string; password?: string },
      callback?: (error?: Error) => void
    ): Promise<void>;

    disconnect(): void;

    send(
      requestType: "GetVersion",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          version: number;
          "obs-websocket-version": string;
          "obs-studio-version": string;
          "available-requests": string;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      version: number;
      "obs-websocket-version": string;
      "obs-studio-version": string;
      "available-requests": string;
    }>;

    send(
      requestType: "GetAuthRequired",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          authRequired: boolean;
          challenge?: string;
          salt?: string;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      authRequired: boolean;
      challenge?: string;
      salt?: string;
    }>;

    send(
      requestType: "Authenticate",
      args: { auth: string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetHeartbeat",
      args: { enable: boolean },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetFilenameFormatting",
      args: { "filename-formatting": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetFilenameFormatting",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "filename-formatting": string }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      "filename-formatting": string;
    }>;

    send(
      requestType: "SetCurrentProfile",
      args: { "profile-name": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetCurrentProfile",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "profile-name": string }
      ) => void
    ): Promise<{ messageId: string; status: "ok"; "profile-name": string }>;

    send(
      requestType: "ListProfiles",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          profiles: Array<{ [k: string]: any }>;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      profiles: Array<{ [k: string]: any }>;
    }>;

    send(
      requestType: "StartStopRecording",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "StartRecording",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "StopRecording",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetRecordingFolder",
      args: { "rec-folder": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetRecordingFolder",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "rec-folder": string }
      ) => void
    ): Promise<{ messageId: string; status: "ok"; "rec-folder": string }>;

    send(
      requestType: "StartStopReplayBuffer",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "StartReplayBuffer",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "StopReplayBuffer",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SaveReplayBuffer",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetCurrentSceneCollection",
      args: { "sc-name": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetCurrentSceneCollection",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "sc-name": string }
      ) => void
    ): Promise<{ messageId: string; status: "ok"; "sc-name": string }>;

    send(
      requestType: "ListSceneCollections",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "scene-collections": string[] }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      "scene-collections": string[];
    }>;

    send(
      requestType: "GetSceneItemProperties",
      args: { "scene-name"?: string; item: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          name: string;
          rotation: number;
          visible: boolean;
          position: { alignment: number; x: number; y: number };
          bounds: { y: number; type: string; alignment: number; x: number };
          scale: { x: number; y: number };
          crop: { top: number; bottom: number; left: number; right: number };
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      rotation: number;
      visible: boolean;
      position: { alignment: number; x: number; y: number };
      bounds: { y: number; type: string; alignment: number; x: number };
      scale: { x: number; y: number };
      crop: { top: number; bottom: number; left: number; right: number };
    }>;

    send(
      requestType: "SetSceneItemProperties",
      args: {
        "scene-name"?: string;
        rotation: number;
        item: string;
        visible: boolean;
        position: { alignment: number; x: number; y: number };
        bounds: { y: number; type: string; alignment: number; x: number };
        scale: { x: number; y: number };
        crop: { bottom: number; left: number; right: number; top: number };
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "ResetSceneItem",
      args: { "scene-name"?: string; item: string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetSceneItemRender",
      args: { source: string; render: boolean; "scene-name"?: string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetSceneItemPosition",
      args: { "scene-name"?: string; item: string; x: number; y: number },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetSceneItemTransform",
      args: {
        "scene-name"?: string;
        item: string;
        "x-scale": number;
        "y-scale": number;
        rotation: number;
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetSceneItemCrop",
      args: {
        "scene-name"?: string;
        item: string;
        top: number;
        bottom: number;
        left: number;
        right: number;
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetCurrentScene",
      args: { "scene-name": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetCurrentScene",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          name: string;
          sources: ObsWebSocket.Source[];
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      sources: ObsWebSocket.Source[];
    }>;

    send(
      requestType: "GetSceneList",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          "current-scene": string;
          scenes: ObsWebSocket.Scene[];
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      "current-scene": string;
      scenes: ObsWebSocket.Scene[];
    }>;

    send(
      requestType: "GetSourcesList",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; sources: string[] }
      ) => void
    ): Promise<{ messageId: string; status: "ok"; sources: string[] }>;

    send(
      requestType: "GetSourcesTypesList",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; ids: { isAsync: boolean }[] }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      ids: { isAsync: boolean }[];
    }>;

    send(
      requestType: "GetVolume",
      args: { source: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          name: string;
          volume: number;
          mute: boolean;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      volume: number;
      mute: boolean;
    }>;

    send(
      requestType: "SetVolume",
      args: { source: string; volume: number },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetMute",
      args: { source: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; name: string; muted: boolean }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      muted: boolean;
    }>;

    send(
      requestType: "SetMute",
      args: { source: string; mute: boolean },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "ToggleMute",
      args: { source: string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetSyncOffset",
      args: { source: string; offset: number },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetSyncOffset",
      args: { source: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; name: string; offset: number }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      offset: number;
    }>;

    send(
      requestType: "GetSourceSettings",
      args: { sourceName: string; sourceType?: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          sourceName: string;
          sourceType: string;
          sourceSettings: {};
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      sourceName: string;
      sourceType: string;
      sourceSettings: {};
    }>;

    send(
      requestType: "SetSourceSettings",
      args: { sourceName: string; sourceType?: string; sourceSettings: {} },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          sourceName: string;
          sourceType: string;
          sourceSettings: {};
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      sourceName: string;
      sourceType: string;
      sourceSettings: {};
    }>;

    send(
      requestType: "GetTextGDIPlusProperties",
      args: { "scene-name"?: string; source: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          align: string;
          render: boolean;
          "bk-opacity": number;
          chatlog: boolean;
          chatlog_lines: number;
          color: number;
          extents: boolean;
          extents_cx: number;
          extents_cy: number;
          file: string;
          read_from_file: boolean;
          font: { style: string; flags: number; face: string; size: number };
          vertical: boolean;
          valign: string;
          "bk-color": number;
          text: string;
          gradient: boolean;
          gradient_color: number;
          gradient_dir: number;
          gradient_opacity: number;
          outline: boolean;
          outline_color: number;
          outline_size: number;
          outline_opacity: number;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      align: string;
      render: boolean;
      "bk-opacity": number;
      chatlog: boolean;
      chatlog_lines: number;
      color: number;
      extents: boolean;
      extents_cx: number;
      extents_cy: number;
      file: string;
      read_from_file: boolean;
      font: { style: string; flags: number; face: string; size: number };
      vertical: boolean;
      valign: string;
      "bk-color": number;
      text: string;
      gradient: boolean;
      gradient_color: number;
      gradient_dir: number;
      gradient_opacity: number;
      outline: boolean;
      outline_color: number;
      outline_size: number;
      outline_opacity: number;
    }>;

    send(
      requestType: "SetTextGDIPlusProperties",
      args: {
        "scene-name"?: string;
        render?: boolean;
        align?: string;
        "bk-color"?: number;
        "bk-opacity"?: number;
        chatlog?: boolean;
        chatlog_lines?: number;
        color?: number;
        extents?: boolean;
        extents_cx?: number;
        extents_cy?: number;
        file?: string;
        read_from_file?: boolean;
        font?: { style?: string; size?: number; face?: string; flags?: number };
        vertical?: boolean;
        source: string;
        valign?: string;
        text?: string;
        gradient?: boolean;
        gradient_color?: number;
        gradient_dir?: number;
        gradient_opacity?: number;
        outline?: boolean;
        outline_color?: number;
        outline_size?: number;
        outline_opacity?: number;
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetBrowserSourceProperties",
      args: { "scene-name"?: string; source: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          is_local_file: boolean;
          local_file: string;
          url: string;
          css: string;
          width: number;
          height: number;
          fps: number;
          shutdown: boolean;
          render?: boolean;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      is_local_file: boolean;
      local_file: string;
      url: string;
      css: string;
      width: number;
      height: number;
      fps: number;
      shutdown: boolean;
      render?: boolean;
    }>;

    send(
      requestType: "SetBrowserSourceProperties",
      args: {
        css?: string;
        "scene-name"?: string;
        is_local_file?: boolean;
        local_file?: string;
        url?: string;
        source: string;
        width?: number;
        height?: number;
        fps?: number;
        shutdown?: boolean;
        render?: boolean;
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "DeleteSceneItem",
      args: { scene?: string; item: { name: string; id: number } },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "DuplicateSceneItem",
      args: {
        fromScene?: string;
        toScene?: string;
        item: { name: string; id: number };
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetSpecialSources",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          "desktop-1"?: string;
          "desktop-2"?: string;
          "mic-1"?: string;
          "mic-2"?: string;
          "mic-3"?: string;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      "desktop-1"?: string;
      "desktop-2"?: string;
      "mic-1"?: string;
      "mic-2"?: string;
      "mic-3"?: string;
    }>;

    send(
      requestType: "GetSourceFilters",
      args: { sourceName: string },
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; filters: {}[] }
      ) => void
    ): Promise<{ messageId: string; status: "ok"; filters: {}[] }>;

    send(
      requestType: "AddFilterToSource",
      args: {
        sourceName: string;
        filterName: string;
        filterType: string;
        filterSettings: {};
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "RemoveFilterFromSource",
      args: { sourceName: string; filterName: string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "ReorderSourceFilter",
      args: { sourceName: string; filterName: string; newIndex: number },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "MoveSourceFilter",
      args: { sourceName: string; filterName: string; movementType: string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetSourceFilterSettings",
      args: { sourceName: string; filterName: string; filterSettings: {} },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetStreamingStatus",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          streaming: boolean;
          recording: boolean;
          "stream-timecode"?: string;
          "rec-timecode"?: string;
          "preview-only": boolean;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      streaming: boolean;
      recording: boolean;
      "stream-timecode"?: string;
      "rec-timecode"?: string;
      "preview-only": boolean;
    }>;

    send(
      requestType: "StartStopStreaming",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "StartStreaming",
      args?: {
        stream?: {
          type?: string;
          metadata?: {};
          settings?: {
            server?: string;
            key?: string;
            "use-auth"?: boolean;
            username?: string;
            password?: string;
          };
        };
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "StopStreaming",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetStreamSettings",
      args: {
        type: string;
        settings: {
          server?: string;
          key?: string;
          "use-auth"?: boolean;
          username?: string;
          password?: string;
        };
        save: boolean;
      },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetStreamSettings",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          type: string;
          settings: {
            server: string;
            key: string;
            "use-auth": boolean;
            username: string;
            password: string;
          };
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      type: string;
      settings: {
        server: string;
        key: string;
        "use-auth": boolean;
        username: string;
        password: string;
      };
    }>;

    send(
      requestType: "SaveStreamSettings",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetStudioModeStatus",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "studio-mode": boolean }
      ) => void
    ): Promise<{ messageId: string; status: "ok"; "studio-mode": boolean }>;

    send(
      requestType: "GetPreviewScene",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          name: string;
          sources: ObsWebSocket.Source[];
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      sources: ObsWebSocket.Source[];
    }>;

    send(
      requestType: "SetPreviewScene",
      args: { "scene-name": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "TransitionToProgram",
      args?: { "with-transition"?: { name: string; duration?: number } },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "EnableStudioMode",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "DisableStudioMode",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "ToggleStudioMode",
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetTransitionList",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          "current-transition": string;
          transitions: string[];
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      "current-transition": string;
      transitions: string[];
    }>;

    send(
      requestType: "GetCurrentTransition",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: {
          messageId: string;
          status: "ok";
          name: string;
          duration?: number;
        }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      name: string;
      duration?: number;
    }>;

    send(
      requestType: "SetCurrentTransition",
      args: { "transition-name": string },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "SetTransitionDuration",
      args: { duration: number },
      callback?: (error: ObsWebSocket.ObsError | null) => void
    ): Promise<void>;

    send(
      requestType: "GetTransitionDuration",
      callback?: (
        error: ObsWebSocket.ObsError | null,
        data: { messageId: string; status: "ok"; "transition-duration": number }
      ) => void
    ): Promise<{
      messageId: string;
      status: "ok";
      "transition-duration": number;
    }>;

    on(event: "ConnectionOpened", listener: () => void): this;
    on(event: "ConnectionClosed", listener: () => void): this;
    on(event: "AuthenticationSuccess", listener: () => void): this;
    on(event: "AuthenticationFailure", listener: () => void): this;

    on(
      event: "SwitchScenes",
      listener: (
        data: { "scene-name": string; sources: ObsWebSocket.Source[] }
      ) => void
    ): this;

    on(event: "ScenesChanged", listener: () => void): this;

    on(event: "SceneCollectionChanged", listener: () => void): this;

    on(event: "SceneCollectionListChanged", listener: () => void): this;

    on(
      event: "SwitchTransition",
      listener: (data: { "transition-name": string }) => void
    ): this;

    on(event: "TransitionListChanged", listener: () => void): this;

    on(
      event: "TransitionDurationChanged",
      listener: (data: { "new-duration": number }) => void
    ): this;

    on(
      event: "TransitionBegin",
      listener: (
        data: {
          name: string;
          duration: number;
          "from-scene": string;
          "to-scene": string;
        }
      ) => void
    ): this;

    on(event: "ProfileChanged", listener: () => void): this;

    on(event: "ProfileListChanged", listener: () => void): this;

    on(
      event: "StreamStarting",
      listener: (data: { "preview-only": boolean }) => void
    ): this;

    on(event: "StreamStarted", listener: () => void): this;

    on(
      event: "StreamStopping",
      listener: (data: { "preview-only": boolean }) => void
    ): this;

    on(event: "StreamStopped", listener: () => void): this;

    on(
      event: "StreamStatus",
      listener: (
        data: {
          streaming: boolean;
          recording: boolean;
          "preview-only": boolean;
          "bytes-per-sec": number;
          "kbits-per-sec": number;
          strain: number;
          "total-stream-time": number;
          "num-total-frames": number;
          "num-dropped-frames": number;
          fps: number;
        }
      ) => void
    ): this;

    on(event: "RecordingStarting", listener: () => void): this;

    on(event: "RecordingStarted", listener: () => void): this;

    on(event: "RecordingStopping", listener: () => void): this;

    on(event: "RecordingStopped", listener: () => void): this;

    on(event: "ReplayStarting", listener: () => void): this;

    on(event: "ReplayStarted", listener: () => void): this;

    on(event: "ReplayStopping", listener: () => void): this;

    on(event: "ReplayStopped", listener: () => void): this;

    on(event: "Exiting", listener: () => void): this;

    on(
      event: "Heartbeat",
      listener: (
        data: {
          "total-stream-bytes"?: number;
          pulse: boolean;
          "current-scene"?: string;
          streaming?: boolean;
          "total-stream-time"?: number;
          "current-profile"?: string;
          "total-stream-frames"?: number;
          recording?: boolean;
          "total-record-time"?: number;
          "total-record-bytes"?: number;
          "total-record-frames"?: number;
        }
      ) => void
    ): this;

    on(
      event: "SourceOrderChanged",
      listener: (data: { "scene-name": string }) => void
    ): this;

    on(
      event: "SceneItemAdded",
      listener: (data: { "scene-name": string; "item-name": string }) => void
    ): this;

    on(
      event: "SceneItemRemoved",
      listener: (data: { "scene-name": string; "item-name": string }) => void
    ): this;

    on(
      event: "SceneItemVisibilityChanged",
      listener: (
        data: {
          "scene-name": string;
          "item-name": string;
          "item-visible": boolean;
        }
      ) => void
    ): this;

    on(
      event: "PreviewSceneChanged",
      listener: (
        data: { "scene-name": string; sources: ObsWebSocket.Source[] }
      ) => void
    ): this;

    on(
      event: "StudioModeSwitched",
      listener: (data: { "new-state": boolean }) => void
    ): this;
  }

  export = ObsWebSocket;
}
