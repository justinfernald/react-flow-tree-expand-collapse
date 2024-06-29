import { createContext, useContext } from 'react';
import { Node, Edge, getOutgoers, getIncomers } from 'reactflow';
import { makeAutoObservable } from 'mobx';

import { FlowHandler } from './FlowHandler';

export class TreeHandler {
  constructor(public flowHandler: FlowHandler) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getNodeById(id: string | null): Node | undefined {
    return this.flowHandler.nodes.find((node) => node.id === id);
  }

  getChildrenCount(node: Node): number {
    const outgoers = getOutgoers(node, this.flowHandler.nodes, this.flowHandler.edges);

    return outgoers.length;
  }

  getDescendantsCount(node: Node): number {
    const outgoers = getOutgoers(node, this.flowHandler.nodes, this.flowHandler.edges);

    return (
      outgoers.length +
      outgoers.reduce((acc, child) => acc + this.getDescendantsCount(child), 0)
    );
  }

  shouldNodeHide(node: Node): boolean {
    const parents = getIncomers(node, this.flowHandler.nodes, this.flowHandler.edges);

    if (parents.length === 0) {
      return false;
    }

    for (const parent of parents) {
      if (parent.data.showingChildren === false) {
        return true;
      }
    }

    return parents.some((parent) => this.shouldNodeHide(parent));
  }

  shouldEdgeHide(edge: Edge): boolean {
    return (
      (!!edge.sourceNode && this.shouldNodeHide(edge.sourceNode)) ||
      (!!edge.targetNode && this.shouldNodeHide(edge.targetNode))
    );
  }

  get nodes() {
    return this.flowHandler.nodes.map((node) => ({
      ...node,
      hidden: this.shouldNodeHide(node),
    }));
  }

  get edges() {
    return this.flowHandler.edges.map((edge) => ({
      ...edge,
      hidden: this.shouldEdgeHide(edge),
    }));
  }
}

export const TreeHandlerContext = createContext<TreeHandler | null>(null);

export const useTreeHandler = () => {
  const treeHandler = useContext(TreeHandlerContext);

  if (!treeHandler) {
    throw new Error('useTreeHandler must be used within a TreeHandlerProvider');
  }

  return treeHandler;
};
