
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from collections import defaultdict
import plotly.graph_objects as go

class HeatMapGenerator:
    def __init__(self, store_width, store_length, grid_size=2.5):
        self.grid_width = int(store_width / grid_size)
        self.grid_length = int(store_length / grid_size)
        self.heat_map = np.zeros((self.grid_width, self.grid_length, 24))
        self.movement_data = defaultdict(list)

    def record_movement(self, customer_id, x, y, hour):
        self.movement_data[customer_id].append((x, y, hour))

    def generate_heat_map(self):
        for movements in self.movement_data.values():
            for i in range(len(movements) - 1):
                start, end = movements[i], movements[i + 1]
                self._add_movement_to_heat_map(start, end)

    def _add_movement_to_heat_map(self, start, end):
        x1, y1, h1 = start
        x2, y2, h2 = end
        dx = abs(x2 - x1)
        dy = abs(y2 - y1)
        sx = 1 if x1 < x2 else -1
        sy = 1 if y1 < y2 else -1
        err = dx - dy

        while True:
            self.heat_map[int(x1), int(y1), int(h1)] += 1
            if int(x1) == int(x2) and int(y1) == int(y2):
                break
            e2 = 2 * err
            if e2 > -dy:
                err -= dy
                x1 += sx
            if e2 < dx:
                err += dx
                y1 += sy

    def get_3d_virtual_walkthrough(self):
        fig = go.Figure(data=[go.Volume(
            x=np.repeat(np.arange(self.grid_width), self.grid_length*24),
            y=np.tile(np.repeat(np.arange(self.grid_length), 24), self.grid_width),
            z=np.tile(np.arange(24), self.grid_width*self.grid_length),
            value=self.heat_map.flatten(),
            isomin=0,
            isomax=self.heat_map.max(),
            opacity=0.1,
            surface_count=20,
        )])
        fig.update_layout(scene_aspectmode='data')
        return fig

    def get_2d_top_down_view(self):
        plt.figure(figsize=(10, 8))
        plt.imshow(np.sum(self.heat_map, axis=2), cmap='hot', interpolation='nearest')
        plt.colorbar(label='Traffic Intensity')
        plt.title('2D Store Traffic Heat Map')
        plt.xlabel('Store Width')
        plt.ylabel('Store Length')
        return plt

    def get_common_routes(self):
        routes = defaultdict(int)
        for movements in self.movement_data.values():
            routes[tuple(movements)] += 1
        return sorted(routes.items(), key=lambda x: x[1], reverse=True)

    def visualize_common_routes(self):
        common_routes = self.get_common_routes()[:5]  # Top 5 common routes
        plt.figure(figsize=(10, 8))
        for route, frequency in common_routes:
            x, y, _ = zip(*route)
            plt.plot(x, y, linewidth=frequency/max(dict(common_routes).values())*10)
        plt.title('Common Routes')
        plt.xlabel('Store Width')
        plt.ylabel('Store Length')
        return plt

    def get_combination_view(self, show_3d=True, show_2d=True, show_routes=True):
        figs = []
        if show_3d:
            figs.append(self.get_3d_virtual_walkthrough())
        if show_2d:
            figs.append(self.get_2d_top_down_view())
        if show_routes:
            figs.append(self.visualize_common_routes())
        return figs